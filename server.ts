import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  const publicDir = path.resolve(__dirname, 'public');
  const targetVideoPath = path.resolve(publicDir, 'segundo-video-correio-digital.mp4');
  const metadataPath = path.resolve(publicDir, 'segundo-video-info.json');

  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. API: Check status of the second video in codebase
  app.get('/api/video2-status', (_req, res) => {
    try {
      const exists = fs.existsSync(targetVideoPath);
      const info = {
        exists,
        url: exists ? '/segundo-video-correio-digital.mp4' : null,
        filename: 'segundo-video-correio-digital.mp4',
        size: 0,
        savedAt: null as string | null,
        originalName: 'Correio Digital Angola - Segundo Vídeo',
      };

      if (exists) {
        const stats = fs.statSync(targetVideoPath);
        info.size = stats.size;
        info.savedAt = stats.mtime.toISOString();
        if (fs.existsSync(metadataPath)) {
          try {
            const meta = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
            if (meta.originalName) info.originalName = meta.originalName;
            if (meta.savedAt) info.savedAt = meta.savedAt;
          } catch (e) {
            // ignore error reading metadata
          }
        }
      }

      res.json(info);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      res.status(500).json({ error: message });
    }
  });

  // 2. API: Stream save video into code (public/segundo-video-correio-digital.mp4)
  app.post('/api/save-video-to-code', (req, res) => {
    try {
      const rawOriginalName = req.headers['x-video-name'] as string | undefined;
      const originalName = rawOriginalName
        ? decodeURIComponent(rawOriginalName)
        : 'Segundo Vídeo Correio Digital';

      const writeStream = fs.createWriteStream(targetVideoPath);

      req.pipe(writeStream);

      writeStream.on('finish', () => {
        try {
          const stats = fs.statSync(targetVideoPath);
          const meta = {
            originalName,
            size: stats.size,
            savedAt: new Date().toISOString(),
            filename: 'segundo-video-correio-digital.mp4',
          };
          fs.writeFileSync(metadataPath, JSON.stringify(meta, null, 2), 'utf-8');

          // If dist exists (production build), keep it synced
          const distDir = path.resolve(__dirname, 'dist');
          if (fs.existsSync(distDir)) {
            try {
              fs.copyFileSync(targetVideoPath, path.resolve(distDir, 'segundo-video-correio-digital.mp4'));
            } catch (e) {
              // ignore sync error
            }
          }

          console.log(
            `[Video Server] Saved video directly into codebase: ${targetVideoPath} (${(stats.size / (1024 * 1024)).toFixed(2)} MB)`
          );

          res.json({
            success: true,
            exists: true,
            url: '/segundo-video-correio-digital.mp4',
            filename: 'segundo-video-correio-digital.mp4',
            size: stats.size,
            originalName,
            savedAt: meta.savedAt,
            message: 'Vídeo guardado com sucesso no código do projecto!',
          });
        } catch (postErr: unknown) {
          const message = postErr instanceof Error ? postErr.message : String(postErr);
          res.status(500).json({ success: false, error: message });
        }
      });

      writeStream.on('error', (err) => {
        console.error('[Video Server] Stream error saving video:', err);
        res.status(500).json({ success: false, error: 'Falha ao guardar ficheiro no servidor.' });
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error('[Video Server] Route error:', err);
      res.status(500).json({ success: false, error: message });
    }
  });

  // 3. API: Delete video from codebase
  app.delete('/api/save-video-to-code', (_req, res) => {
    try {
      if (fs.existsSync(targetVideoPath)) {
        fs.unlinkSync(targetVideoPath);
      }
      if (fs.existsSync(metadataPath)) {
        fs.unlinkSync(metadataPath);
      }
      const distVideo = path.resolve(__dirname, 'dist', 'segundo-video-correio-digital.mp4');
      if (fs.existsSync(distVideo)) {
        fs.unlinkSync(distVideo);
      }
      res.json({ success: true, message: 'Vídeo removido do código do projecto.' });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      res.status(500).json({ success: false, error: message });
    }
  });

  // Explicitly serve static files from public
  app.use(express.static(publicDir));

  // Mount Vite middlewares in development or static dist in production
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Correio Digital Angola running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
