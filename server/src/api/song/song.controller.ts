import { Controller, Get, Req, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { SongService } from './song.service';

@Controller('api/song')
export class SongController {

    constructor(private readonly songService: SongService) { }

    @Get()
    async getSongs(@Req() req, @Body() dto: any, @Res() res: Response){
            const songs = await this.songService.getSongs(dto)
            return res.json(songs)
    }
}
