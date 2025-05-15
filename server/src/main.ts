import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useWebSocketAdapter(new IoAdapter(app));

  // if (process.env.NODE_ENV === 'development') {
    const clientPath = join(__dirname, '..', 'client-build');
    app.useStaticAssets(clientPath);
    app.getHttpAdapter().get('*', (req: Request, res: Response) => {
      if (req.path.startsWith('/api')) return;
      res.sendFile(join(clientPath, 'index.html'));
    });
  // }
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
