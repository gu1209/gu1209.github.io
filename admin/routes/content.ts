import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { requireAuth } from './auth';

const DATA_DIR = path.join(process.cwd(), 'data');

// Allowed content types (maps to data/*.json)
const ALLOWED_TYPES = ['profile', 'experiences', 'projects', 'skills', 'starData'];

export const contentRouter = Router();
contentRouter.use(requireAuth);

// GET /api/content/:type — read a JSON data file
contentRouter.get('/:type', (req: Request, res: Response) => {
  const type = req.params.type as string;
  if (!ALLOWED_TYPES.includes(type)) {
    res.status(400).json({ error: `不支持的类型: ${type}` });
    return;
  }

  const filePath = path.join(DATA_DIR, `${type}.json`);
  if (!fs.existsSync(filePath)) {
    res.status(404).json({ error: '文件不存在' });
    return;
  }

  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    res.json(JSON.parse(raw));
  } catch (err: any) {
    res.status(500).json({ error: `读取失败: ${err.message}` });
  }
});

// PUT /api/content/:type — write a JSON data file
contentRouter.put('/:type', (req: Request, res: Response) => {
  const type = req.params.type as string;
  if (!ALLOWED_TYPES.includes(type)) {
    res.status(400).json({ error: `不支持的类型: ${type}` });
    return;
  }

  const filePath = path.join(DATA_DIR, `${type}.json`);

  try {
    // Validate that body is valid JSON
    const jsonStr = JSON.stringify(req.body, null, 2);
    JSON.parse(jsonStr); // double-validate

    // Backup the old file
    if (fs.existsSync(filePath)) {
      const backupPath = filePath + '.bak';
      fs.copyFileSync(filePath, backupPath);
    }

    fs.writeFileSync(filePath, jsonStr, 'utf-8');
    res.json({ success: true, message: '保存成功' });
  } catch (err: any) {
    // Restore from backup if write failed
    const backupPath = filePath + '.bak';
    if (fs.existsSync(backupPath)) {
      fs.copyFileSync(backupPath, filePath);
    }
    res.status(500).json({ error: `保存失败: ${err.message}` });
  }
});

// GET /api/content — list all content types
contentRouter.get('/', (_req: Request, res: Response) => {
  const types = ALLOWED_TYPES.map(type => {
    const filePath = path.join(DATA_DIR, `${type}.json`);
    return {
      type,
      exists: fs.existsSync(filePath),
      size: fs.existsSync(filePath) ? fs.statSync(filePath).size : 0,
    };
  });
  res.json(types);
});
