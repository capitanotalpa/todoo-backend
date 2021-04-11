import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByName(username);
    if (!user) return null;
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) reject(err);
        if (result) {
          const userData = {
            _id: user._id,
            username: user.username,
            // TODO: think of simplest implementation
          };
          resolve(userData);
        } else {
          reject(null);
        }
      });
    });
  }
}
