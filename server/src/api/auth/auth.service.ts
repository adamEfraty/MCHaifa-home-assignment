import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/models/schemas/user.schema';
import { FullUserDto, LoginDto, RegisterDto } from 'src/models/dto/user.dto';
import Cryptr from 'cryptr';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/models/interfaces/user.interface';
import * as dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
dotenv.config();

@Injectable()
export class AuthService {
  private cryptr: Cryptr;

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {
    const secret = process.env.ENCRYPTION_KEY || "";
    if (!secret) {
      throw new Error('ENCRYPTION_KEY is not set in environment variables');
    }
    this.cryptr = new Cryptr(secret);
  }

  validateToken(loginToken: string): string | null {
    try {
      const json = this.cryptr.decrypt(loginToken);
      const loggedinUser = JSON.parse(json);
      return loggedinUser;
    } catch (err) {
      console.log('Invalid login token');
    }
    return null;
  }

  getLoginToken(user: UserModel): string {
    const userInfo = {
      _id: user._id,
      username: user.username,
      instrument: user.instrument,
      role: user.role,
    };
    return this.cryptr.encrypt(JSON.stringify(userInfo));
  }

  async validateUser(username: string): Promise<false | FullUserDto> {
    const foundUser = await this.userModel.findOne({ username });
    if (!foundUser) return false;

    const userObj = foundUser.toObject();
    return {
      username: userObj.username,
      password: userObj.password,
      instrument: userObj.instrument,
      role: userObj.role,
    };
  }

  async register(dto: RegisterDto): Promise<string | UserModel> {
    const isTaken = await this.validateUser(dto.username);
    if (isTaken) throw Error("Username is taken.");

    const hash = await bcrypt.hash(dto.password, 10);
    dto = { ...dto, password: hash };
    const newUser = new this.userModel(dto);
    const savedUser = await newUser.save();

    return {
      _id: savedUser._id as Types.ObjectId,
      username: savedUser.username,
      role: savedUser.role,
      instrument: savedUser.instrument,
    };
  }

  async login(username: string, password: string): Promise<UserModel> {
    const foundUser = await this.userModel.findOne({ username });
    if (!foundUser) throw new Error('Invalid username or password');

    const userObj = foundUser.toObject();
    const match = await bcrypt.compare(password, userObj.password);
    if (!match) {
      throw new Error('Invalid username or password');
    }

    const { password: _, ...safeUser } = userObj;
    return safeUser as UserModel;
  }
}
