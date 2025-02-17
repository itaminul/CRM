import { Controller } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(public readonly authService: AuthService) {}
  async login(loginDto: LoginDto) {
    try {
      const results = await this.authService.login(loginDto);
      return results;
    } catch (error) {
      console.log(error);
    }
  }
}
