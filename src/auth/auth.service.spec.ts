import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../entities/users'; // Assuming you have a User entity

describe('AuthService', () => {
  let service: AuthService;

  const mockUsersRepository = {
    // Add mock methods here that are used by AuthService
    findOne: jest.fn(),
    save: jest.fn(),
  };

  const mockJwtService = {
    // Add mock methods here that are used by AuthService
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(Users), // Assuming UsersRepository is a TypeORM repository
          useValue: mockUsersRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});