import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { Get, Post, Req, Body } from '@nestjs/common';
import { RegisterDto, LoginDto } from './dto/user.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  login(@Req() req, @Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('register')
  register(@Req() req, @Body() dto: any) {
    console.log(dto)
    const isAdmin =
      req.headers.origin?.includes('admin') || dto.role === 'admin';
    dto.role = isAdmin ? 'admin' : 'user';
    return this.authService.register(dto);
  }
}
