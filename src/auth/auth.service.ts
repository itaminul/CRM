import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Users } from '../entities/users';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { BaseService } from 'src/common/services/base.service';
import { AuthRepositories } from './auth.repositories';

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
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Invalid username',
        error: 'Unauthorized',
      });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(pass, user.password);
    if (!passwordMatch) {
      console.log('Invalid password attempt for username:', username);
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Invalid password',
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
    try {
      const user = await this.validateUser(
        loginDto.username,
        loginDto.password,
      );
      if (!user.role) {
        console.log('No role found for the user:', user.username);
        throw new UnauthorizedException('User does not have a role');
      }
      const payload = { username: user.username, role: user.role.name };
      // Return the access token
      const access_token = this.jwtService.sign(payload);

      return {
        access_token,
        username: user.username,
        role: user.role.name,
      };
    } catch (error) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Login failed: Invalid credentials',
        error: 'Unauthorized',
      });
    }
  }
}
