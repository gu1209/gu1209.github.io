import { Router, Request, Response } from 'express';
import { simpleGit } from 'simple-git';
import path from 'path';
import { requireAuth } from './auth';

const git = simpleGit(path.join(process.cwd()));

export const gitRouter = Router();
gitRouter.use(requireAuth);

// GET /api/git/status — get current git status
gitRouter.get('/status', async (_req: Request, res: Response) => {
  try {
    const status = await git.status();
    res.json({
      current: status.current,
      tracking: status.tracking,
      files: status.files,
      staged: status.staged,
      modified: status.modified,
      created: status.created,
      deleted: status.deleted,
      renamed: status.renamed,
      not_added: status.not_added,
      isClean: status.isClean(),
      ahead: status.ahead,
      behind: status.behind,
    });
  } catch (err: any) {
    res.status(500).json({ error: `获取状态失败: ${err.message}` });
  }
});

// POST /api/git/commit — stage all changes and commit
gitRouter.post('/commit', async (req: Request, res: Response) => {
  const { message } = req.body;
  if (!message || !message.trim()) {
    res.status(400).json({ error: '请输入提交信息' });
    return;
  }

  try {
    // Stage all changes
    await git.add('.');

    // Check if there's anything to commit
    const status = await git.status();
    if (status.isClean()) {
      res.status(400).json({ error: '没有需要提交的更改' });
      return;
    }

    const result = await git.commit(message.trim());
    res.json({
      success: true,
      commit: result.commit,
      summary: result.summary,
      message: '提交成功',
    });
  } catch (err: any) {
    res.status(500).json({ error: `提交失败: ${err.message}` });
  }
});

// POST /api/git/push — push to remote
gitRouter.post('/push', async (_req: Request, res: Response) => {
  try {
    // Check remotes exist
    const remotes = await git.getRemotes(true);
    if (remotes.length === 0) {
      res.status(400).json({ error: '未配置远程仓库（git remote）' });
      return;
    }

    const result = await git.push();

    // Parse the push result
    const pushed = result.pushed || [];
    const updates = result.update || {};

    res.json({
      success: true,
      message: '推送成功',
      pushed,
      remote: remotes[0].name,
      refs: remotes[0].refs,
    });
  } catch (err: any) {
    res.status(500).json({ error: `推送失败: ${err.message}` });
  }
});

// GET /api/git/log — recent commit history
gitRouter.get('/log', async (req: Request, res: Response) => {
  try {
    const n = parseInt(req.query.n as string) || 5;
    const log = await git.log({ maxCount: n });
    res.json(log.all.map(entry => ({
      hash: entry.hash,
      date: entry.date,
      message: entry.message,
      author: entry.author_name,
    })));
  } catch (err: any) {
    res.status(500).json({ error: `获取日志失败: ${err.message}` });
  }
});
