import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/users';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { BaseService } from 'src/common/services/base.service';
import { AuthRepositories } from './auth.repositories';


@Injectable()
export class AuthService extends BaseService<Users> {
  constructor(private readonly userRepository: AuthRepositories) {
    super(userRepository)
  }



  async register(registerDto: RegisterDto) {
    try {
      // Registration logic
    } catch (error) {
      // Error handling logic
    }
  }

  async login(loginDto: LoginDto) {
    // Mock logic for login
    if (
      loginDto.email === 'test@example.com' &&
      loginDto.password === 'password123'
    ) {
      return { access_token: 'mockAccessToken' };
    }
    throw new UnauthorizedException();
  }
}
