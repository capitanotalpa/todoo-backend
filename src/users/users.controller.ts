import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/user.create.dto';
import { UserDocument } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<UserDocument[]> {
    return this.usersService.getAllUsers();
  }

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserDocument> {
    return this.usersService.create(createUserDto);
  }
}
