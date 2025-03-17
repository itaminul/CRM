import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
import { UserRepository } from 'src/common/user.repository';

@Injectable()
export class AuthService extends BaseService<Users> {
  constructor(
    private readonly userRepository: AuthRepositories,
    private readonly jwtService: JwtService,
  ) {
    super(userRepository);
  }

  async validateUser(username: string, password: string) {
    const user = await this.userRepository.findByUserName(username);
  }

  async register(registerDto: RegisterDto) {
    try {
      // Check if user already exists
      const existingUser = await this.userRepository.findOneUser(
        registerDto.username,
      );
      if (existingUser) {
        throw new ConflictException('User with this username already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);

      const resume = this.userRepository.create({
        ...registerDto,
        password: hashedPassword,
      });
      // Save the Resume userRepository
      const savedResume = await this.userRepository.save(resume);
      return savedResume;
    } catch (error) {
      console.log(error);
    }
  }

  async login(loginDto: LoginDto) {
    try {
     // if (loginDto.username === 'aminul' && loginDto.password === '123456') {
        const payload = {
          username: loginDto.username,
          sub: loginDto.id,
          role: loginDto.name,
        };
        return {
          access_token: this.jwtService.sign(payload),
        };
     // }
    } catch (error) {
      console.log(error);
    }
  }
}
