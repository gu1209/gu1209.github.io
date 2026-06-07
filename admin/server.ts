import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth';
import { contentRouter } from './routes/content';
import { blogRouter } from './routes/blog';
import { mediaRouter } from './routes/media';
import { gitRouter } from './routes/git';

const app = express();
const PORT = process.env.ADMIN_PORT || 3001;

// ── Middleware ──────────────────────────────────────────────────────────
app.use(cors({ origin: ['http://localhost:3000', 'http://127.0.0.1:3000'] }));
app.use(express.json({ limit: '5mb' }));

// ── Health check ────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── Routes ──────────────────────────────────────────────────────────────
app.use('/api/auth', authRouter);
app.use('/api/content', contentRouter);
app.use('/api/blog', blogRouter);
app.use('/api/media', mediaRouter);
app.use('/api/git', gitRouter);

// ── Start ───────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🔧 Admin server running on http://localhost:${PORT}`);
  console.log(`   API: http://localhost:${PORT}/api/health\n`);
});
