import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import { AuthDto } from '../src/auth/dto/auth.dto';

const testDto: AuthDto = {
  email: 'a@a.ru',
  name: 'Name',
  password: '12345',
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/register (POST)', (done) => {
    request(app.getHttpServer())
      .post('/auth/register')
      .send(testDto)
      .expect(201)
      .expect(({ body }: request.Response) => {
        createdId = body._id;
        expect(createdId).toBeDefined;
      })
      .end(done);
  });

  it('/user/:id (DELETE)', (done) => {
    request(app.getHttpServer())
      .delete('/user/' + createdId)
      .expect(200)
      .end(done);
  });

  afterAll(() => {
    disconnect();
  });
});
