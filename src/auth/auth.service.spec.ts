import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Users } from '../user/user.model';
import { AuthService } from './auth.service';
describe('MyService', () => {
  let service: AuthService;
  const authRepoFactory = () => ({
    create: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { useFactory: authRepoFactory, provide: getModelToken(Users.name) },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
