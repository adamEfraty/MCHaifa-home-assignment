import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { LoginDto, RegisterDto } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }
    register(dto: RegisterDto): any {
        console.log(dto)
        const newUser = new this.userModel(dto)
        newUser.save()
    }

    login(dto: LoginDto): any {
        return ""
    }
}
