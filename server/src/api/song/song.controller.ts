import { Controller, Get, Req, Res, Body, Query } from '@nestjs/common';
import { Response } from 'express';
import { SongService } from './song.service';

@Controller('api/song')
export class SongController {

    constructor(private readonly songService: SongService) { }

    @Get()
    async getSongs(@Query() params: any, @Res() res: Response){
        console.log("I got here")
            const songs = await this.songService.getSongs(params)
            return res.json(songs)
    }
}
