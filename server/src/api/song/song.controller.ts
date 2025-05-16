import { Controller, Get, Req, Res, Body, Query } from '@nestjs/common';
import { Response } from 'express';
import { SongService } from './song.service';

@Controller('api/song')
export class SongController {

    constructor(private readonly songService: SongService) { }

    @Get('songs')
    async getSongs(@Query() params: any, @Res() res: Response){
            const songs = await this.songService.getSongs(params)
            return res.json(songs)
    }
}
