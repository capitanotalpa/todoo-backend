import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

  @Get('/:id')
  async findOneById(@Param('id') id: string): Promise<UserDocument> {
    return this.usersService.findOneById(id);
  }

  @Delete('/:id')
  async deleteUserById(
    @Param('id') id: string,
  ): Promise<{ n?: number; ok?: number; deletedCount?: number }> {
    return this.usersService.removeUser(id);
  }
}
