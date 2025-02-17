import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../entities/users";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private jwtServiec: JwtService
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userRepository.findOne({
      where: {
        name: username,
      }
    });
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(registerDto: RegisterDto) {
    try {
      
    } catch (error) {
      
    }
  }

  async login(loginDto: LoginDto) {
    // Mock logic for login
    if (loginDto.email === "test@example.com" && loginDto.password === "password123") {
      return { access_token: "mockAccessToken" };
    }
    throw new UnauthorizedException();
  }


}
