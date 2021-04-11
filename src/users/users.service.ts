import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user.create.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    return new Promise<UserDocument>((resolve, reject) => {
      bcrypt.genSalt(SALT_ROUNDS, (err, salt: string) => {
        if (err) reject(err);
        bcrypt.hash(createUserDto.password, salt, (err, hash: string) => {
          if (err) reject(err);
          const createdUser = new this.userModel({
            username: createUserDto.username,
            password: hash,
          });
          resolve(createdUser.save());
        });
      });
    });
  }

  async getAllUsers(): Promise<UserDocument[]> {
    return this.userModel.find({}).exec();
  }

  async findOneById(userId: string): Promise<UserDocument> {
    return this.userModel.findOne({ _id: userId }).exec();
  }

  async findOneByName(username: string): Promise<UserDocument> {
    return this.userModel
      .findOne({ username: username })
      .select('+password')
      .exec();
  }

  async removeUser(
    userId: string,
  ): Promise<{ n?: number; ok?: number; deletedCount?: number }> {
    return this.userModel.deleteOne({ _id: userId }).exec();
  }
}
