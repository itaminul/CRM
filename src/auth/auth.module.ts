import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthRepositories } from './auth.repositories';
import { UserRepository } from 'src/common/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '12' },
    }),
  ],
  providers: [JwtService, AuthService, AuthRepositories, UserRepository],
  controllers: [AuthController],
})
export class AuthModule {}
