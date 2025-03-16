import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users';
import { JwtModule } from '@nestjs/jwt';
import { AuthRepositories } from './auth.repositories';
import { UserRepository } from 'src/common/user.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'guard/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([Users]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'fallback_secret_key',
        signOptions: { expiresIn: '12h' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, AuthRepositories, UserRepository, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}