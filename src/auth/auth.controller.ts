import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ExceptionsFilter } from 'src/filters/all-exceptions';

@Controller('auth')
export class AuthController {
  constructor(public readonly authService: AuthService) {}

  @Post('login')
  @UseFilters(new ExceptionsFilter())
  async login(@Body() loginDto: LoginDto) {
    try {
      const results = await this.authService.login(loginDto);
      return results;
    } catch (error) {
      throw error;
    }
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
     // console.log('registerDto', registerDto);
      const results = await this.authService.register(registerDto);
      return results;
    } catch (error) {
      throw error;
    }
  }
}
