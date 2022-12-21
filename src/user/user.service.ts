import { JWT_TOKEN } from '@app/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { AuthUserDto } from './dto/authUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UserResponseInterface } from './types/userResponse.interface';
import { UserEntity } from './user.entity';
import DataSource from '@app/data-source';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    const userByUsername = await this.userRepository.findOneBy({
      username: createUserDto.username,
    });

    if (userByEmail && userByUsername) {
      throw new HttpException(
        'Email and username are taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else if (userByEmail) {
      throw new HttpException(
        'Email are taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else if (userByUsername) {
      throw new HttpException(
        'Username are taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newUser = new UserEntity();

    // клонируем объект
    Object.assign(newUser, createUserDto);

    // сохраняем нового пользователя в базу
    return await this.userRepository.save(newUser);
  }

  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      JWT_TOKEN,
    );
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }

  async authUser(authUserDto: AuthUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      select: {
        username: true,
        email: true,
        bio: true,
        image: true,
        password: true,
      },
      where: {
        email: authUserDto.email,
      },
    });

    let userPassword: boolean;
    if (user) {
      userPassword = await compare(authUserDto.password, user.password);
    }

    if (!user || !userPassword) {
      throw new HttpException(
        'Email or password is wrong',
        HttpStatus.FORBIDDEN,
      );
    }

    return user;
  }
}
