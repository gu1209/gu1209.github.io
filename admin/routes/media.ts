import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { requireAuth } from './auth';

const MEDIA_DIR = path.join(process.cwd(), 'public', 'images', 'blog');

// Ensure media directory exists
if (!fs.existsSync(MEDIA_DIR)) {
  fs.mkdirSync(MEDIA_DIR, { recursive: true });
}

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, MEDIA_DIR),
  filename: (_req, file, cb) => {
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    cb(null, `${timestamp}_${safeName}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_req, file, cb) => {
    const allowed = /\.(jpg|jpeg|png|gif|webp|svg)$/i;
    if (allowed.test(path.extname(file.originalname))) {
      cb(null, true);
    } else {
      cb(new Error('仅支持 jpg, png, gif, webp, svg 格式'));
    }
  },
});

export const mediaRouter = Router();
mediaRouter.use(requireAuth);

// GET /api/media — list all uploaded images
mediaRouter.get('/', (_req: Request, res: Response) => {
  if (!fs.existsSync(MEDIA_DIR)) {
    res.json([]);
    return;
  }

  const files = fs.readdirSync(MEDIA_DIR)
    .filter(f => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f))
    .map(f => {
      const filePath = path.join(MEDIA_DIR, f);
      const stat = fs.statSync(filePath);
      return {
        name: f,
        url: `/images/blog/${f}`,
        size: stat.size,
        uploadedAt: stat.mtime.toISOString(),
        markdown: `![${f}](/images/blog/${f})`,
      };
    })
    .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

  res.json(files);
});

// POST /api/media/upload — upload an image
mediaRouter.post('/upload', upload.single('image'), (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ error: '请选择图片文件' });
    return;
  }

  const file = req.file;
  res.json({
    success: true,
    name: file.filename,
    url: `/images/blog/${file.filename}`,
    size: file.size,
    markdown: `![${file.originalname}](/images/blog/${file.filename})`,
  });
});

// DELETE /api/media/:filename — delete an image
mediaRouter.delete('/:filename', (req: Request, res: Response) => {
  const filename = req.params.filename as string;
  const filePath = path.join(MEDIA_DIR, filename);

  // Security: prevent path traversal
  if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
    res.status(400).json({ error: '非法文件名' });
    return;
  }

  if (!fs.existsSync(filePath)) {
    res.status(404).json({ error: '文件不存在' });
    return;
  }

  try {
    fs.unlinkSync(filePath);
    res.json({ success: true, message: '图片已删除' });
  } catch (err: any) {
    res.status(500).json({ error: `删除失败: ${err.message}` });
  }
});
