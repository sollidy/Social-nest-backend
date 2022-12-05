import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect, Types } from 'mongoose';
import { AuthDto } from '../src/auth/dto/auth.dto';
import { USER_NOT_FOUND } from '../src/user/user.constants';

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
      .then(({ body }: request.Response) => {
        createdId = body._id;
        expect(createdId).toBeDefined;
        done();
      })
      .catch((err) => {
        throw new Error('Register failed');
        done();
      });
  });

  it('/user/:id (DELETE) - fail', (done) => {
    request(app.getHttpServer())
      .delete('/user/' + new Types.ObjectId().toHexString())
      .expect(404, {
        statusCode: 404,
        message: USER_NOT_FOUND,
      })
      .end(done);
  });

  it('/user/:id (DELETE) - success', (done) => {
    request(app.getHttpServer())
      .delete('/user/' + createdId)
      .expect(200)
      .end(done);
  });

  afterAll(() => {
    disconnect();
  });
});
