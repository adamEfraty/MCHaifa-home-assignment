import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/models/dto/user.dto';
import { Response } from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('validate')
  validateUser(@Req() req, @Body() dto: any, @Res() res: Response) {
    const token = req.cookies?.loginToken;
    const user = this.authService.validateToken(token);
    return res.json(user);
  }

  @Post('login')
  async login(@Req() req, @Body() dto: LoginDto, @Res() res: Response) {
    try {
      const user = await this.authService.login(dto.username, dto.password);
      const loginToken = this.authService.getLoginToken(user);


      res.cookie('loginToken', loginToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      res.json(user);
      return res;
    } catch (err) {
      console.error(err.message);
      return res.status(401).send({ err: err.message });
    }
  }

  @Post('register')
  async register(@Req() req, @Body() dto: any, @Res() res: Response) {
    try {
      const data = await this.authService.register(dto);
      if (typeof data === 'string') return res.json({ message: data });
      const loginToken = this.authService.getLoginToken(data);

      res.cookie('loginToken', loginToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      res.json(data);
      return res;
    } catch (err) {
      throw Error(err);
    }
  }
}
