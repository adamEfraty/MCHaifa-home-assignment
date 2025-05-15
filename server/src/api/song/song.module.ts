import { Module } from '@nestjs/common';
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { SongGateway } from '../../socket/socket.gatway';
import { MongooseModule } from '@nestjs/mongoose';
import { Song, SongSchema } from 'src/models/schemas/songs.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Song.name, schema: SongSchema }])
  ],
  controllers: [SongController],
  providers: [SongService, SongGateway]
})
export class SongModule {}
