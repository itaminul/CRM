import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthRepositories } from './auth.repositories';
import { UserRepository } from 'src/common/user.repository';

const jwtConstants = {
  secret: 'secret_Key',
};

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'secret',
      secretOrPrivateKey: jwtConstants.secret,
      signOptions: { expiresIn: '12' },
    }),
  ],
  providers: [AuthService, AuthRepositories, UserRepository, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
