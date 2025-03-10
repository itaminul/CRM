import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/entities/users";
import { JwtService } from "@nestjs/jwt";
import { AuthRepositories } from "./auth.repositories";

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [JwtService, AuthService, AuthRepositories],
  controllers: [AuthController],
})
export class AuthModule {}
