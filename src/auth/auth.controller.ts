import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(public readonly authService: AuthService) {}

  @Post()
  async login(loginDto: LoginDto) {
    try {
      const results = await this.authService.login(loginDto);
      return results;
    } catch (error) {
      console.log(error);
    }
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      console.log("registerDto", registerDto);
      const results = await this.authService.register(registerDto);
      return results;
    } catch (error) {
      console.log(error);
    }
  }
}
