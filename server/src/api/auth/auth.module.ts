import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema, UserDocument } from 'src/models/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { Model } from 'mongoose';
@Module({
    imports: [
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: "4h" }
      }),
    ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
