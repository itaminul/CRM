import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/users';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { BaseService } from 'src/common/services/base.service';
import { AuthRepositories } from './auth.repositories';
import { plainToClass } from 'class-transformer';


@Injectable()
export class AuthService extends BaseService<Users> {
  constructor(private readonly userRepository: AuthRepositories) {
    super(userRepository)
  }



  async register(registerDto: RegisterDto) {
    try {
     // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(registerDto.email)
    if (existingUser) {
      throw new ConflictException("User with this email already exists")
    }

    // Hash password
  //  const hashedPassword = await bcrypt.hash(registerDto.password, 10)

    const resume = this.userRepository.create(registerDto);
    // Save the Resume userRepository
    const savedResume = await this.userRepository.save(resume);
    return savedResume;

    } catch (error) {
      console.log(error);
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
