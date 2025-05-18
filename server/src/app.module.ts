import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './api/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SongModule } from './api/song/song.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client-build'),
    }),
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://mrEfraty:nqQaOqQjZtx0i6nJ@mchaifa-project.i0uojfl.mongodb.net/',
    ),
    SongModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
