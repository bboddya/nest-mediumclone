import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  async createUser(@Body('user') createUserDto: CreateUserDto): Promise<any> {
    console.log('createUserDto', createUserDto);
    return this.userService.createUser(createUserDto);
  }

  //   @Get()
  //   async findAll(): Promise<{ users: UserService[] }> {
  //     const users = await this.userService.findAll();
  //     return {
  //       users: users.map((user) => user),
  //     };
  //   }
}
