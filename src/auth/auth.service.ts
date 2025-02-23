import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/users';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { BaseService } from 'src/common/base.service';

@Injectable()
export class AuthService extends BaseService<Users> {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private jwtService: JwtService, // fixed typo in variable name
  ) {
    super(userRepository);
  }

  async validateUser(username: string, pass: string) {
    const user = await this.userRepository.findOne({
      where: {
        name: username,
      },
    });
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
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
