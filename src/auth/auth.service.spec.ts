import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Users } from '../user/user.model';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('MyService', () => {
  let service: AuthService;

  const authRepoFactory = () => ({
    create: jest.fn(),
  });

  const mockedJwtService = {
    sign: () => '',
  };

  const mockedUserService = {
    findUser: () => '',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { useFactory: authRepoFactory, provide: getModelToken(Users.name) },
        { provide: JwtService, useValue: mockedJwtService },
        { provide: UserService, useValue: mockedUserService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
