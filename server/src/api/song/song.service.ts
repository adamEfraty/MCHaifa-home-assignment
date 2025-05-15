import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Song } from '../../models/schemas/songs.schema'; // adjust path as needed
import { SongDocument } from '../../models/schemas/songs.schema';

@Injectable()
export class SongService {
  constructor(
    @InjectModel(Song.name) private songModel: Model<SongDocument>,
  ) {}

  async getSongs(dto: string) {
    const query: any = {};

    if (dto) {
      query.title = new RegExp(dto, 'i');
    }

    const songs = await this.songModel.find(query).limit(10); // optional limit
    return songs;
  }
}
