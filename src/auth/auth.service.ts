import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/users';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
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


  async validateUser(username: string, pass: string) {
    // Find user by username
    const user = await this.userRepository.findOne(username);

    if (!user) {
        console.log('No user found for username:', username);
        // Throw UnauthorizedException with custom message and structure
        throw new UnauthorizedException({
            statusCode: 401,
            message: 'Invalid username or password',
            error: 'Unauthorized',
        });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(pass, user.password);
    if (!passwordMatch) {
        console.log('Invalid password attempt for username:', username);
        // Throw UnauthorizedException with custom message and structure
        throw new UnauthorizedException({
            statusCode: 401,
            message: 'Invalid username or password',
            error: 'Unauthorized',
        });
    }

    // Return user if everything is valid
    return user;
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
    const user = await this.validateUser(loginDto.username, loginDto.password);
    if (!user.role) {
      console.log('No role found for the user:', user.username);
      throw new UnauthorizedException('User does not have a role');
    }
    const payload = { username: user.username, role: user.role.name };
    // Return the access token
    const access_token = this.jwtService.sign(payload);
    // console.log('Generated access token:', access_token);  // Log the generated token for debugging

    return {
      access_token,
    };
  }
}
