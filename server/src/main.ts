import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useWebSocketAdapter(new IoAdapter(app));

  const clientPath = join(__dirname, '..', 'client-build');

  // ✅ Serve static assets
  app.use(express.static(clientPath));

  // ✅ Catch-all: send index.html for non-API routes
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) return next(); // let Nest handle it
    res.sendFile(join(clientPath, 'index.html'));
  });

  await app.listen(process.env.PORT || 3000);
  console.log(`🔥 Server ready on http://localhost:${process.env.PORT || 3000}`);
}
bootstrap();
