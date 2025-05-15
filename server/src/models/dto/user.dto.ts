export class RegisterDto {
  username: string;
  instrument: string;
  password: string;
  role: string;
}

export class LoginDto {
  username: string;
  password: string;
  role: string;
}

export interface FullUserDto {
  username: string;
  instrument: string;
  password: string;
  role: string;
}
