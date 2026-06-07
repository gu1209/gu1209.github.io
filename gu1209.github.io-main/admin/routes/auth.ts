import { Router, Request, Response } from 'express';

const ADMIN_PASSWORD = '1209';

// Simple in-memory token store
let validTokens: Set<string> = new Set();

function generateToken(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 32; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `admin_${token}_${Date.now()}`;
}

export const authRouter = Router();

// POST /api/auth/login
authRouter.post('/login', (req: Request, res: Response) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    const token = generateToken();
    validTokens.add(token);
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, error: '密码错误' });
  }
});

// POST /api/auth/logout
authRouter.post('/logout', (req: Request, res: Response) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (token) validTokens.delete(token);
  res.json({ success: true });
});

// POST /api/auth/verify
authRouter.post('/verify', (req: Request, res: Response) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (token && validTokens.has(token)) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, error: '未授权' });
  }
});

// Auth middleware for other routes
export function requireAuth(req: Request, res: Response, next: () => void) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (token && validTokens.has(token)) {
    next();
  } else {
    res.status(401).json({ error: '未授权，请先登录' });
  }
}
