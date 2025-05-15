import { Types } from 'mongoose';

export interface UserModel {
    _id: Types.ObjectId;
    username: string;
    instrument: string;
    role: string;
}
