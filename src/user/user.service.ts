import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
// import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  async createUser(createUserDto: CreateUserDto) {
    return createUserDto;
  }
  //   constructor(
  //     @InjectRepository(UserEntity)
  //     private readonly userRepository: Repository<UserEntity>,
  //   ) {}
  //   async findAll(): Promise<UserEntity[]> {
  //     return await this.userRepository.find();
  //   }
}
