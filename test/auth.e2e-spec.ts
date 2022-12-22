import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect, Types } from 'mongoose';
import { AuthDto } from '../src/auth/dto/auth.dto';
import { USER_IN_DB_NOT_FOUND_ERROR } from '../src/user/user.constants';

const testDto: AuthDto = {
  email: 'testApiNest@a.ru',
  name: 'Name',
  password: '12345',
};

const loginDto: Omit<AuthDto, 'name'> = {
  email: 'a@a.ru',
  password: '12345',
};

jest.useRealTimers();

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    //before test register user with e-mail: a@a.ru, password: 12345, Role: ADMIN
    const { body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto);
    token = body.access_token;
  }, 8000);

  it('/auth/register (POST) - success', (done) => {
    request(app.getHttpServer())
      .post('/auth/register')
      .send(testDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdId = body._id;
        expect(createdId).toBeDefined();
        done();
      })
      .catch(() => {
        throw new Error('Register failed');
      });
  }, 8000);

  it('/auth/register (POST) - fail', (done) => {
    request(app.getHttpServer())
      .post('/auth/register')
      .send({ ...testDto, email: 'ru.ru' })
      .expect(400)
      .end(done);
  });

  it('/user/:id (DELETE) - fail', (done) => {
    request(app.getHttpServer())
      .delete('/user/' + new Types.ObjectId().toHexString())
      .set('Authorization', 'Bearer ' + token)
      .expect(404, {
        statusCode: 404,
        message: USER_IN_DB_NOT_FOUND_ERROR,
      })
      .end(done);
  });

  it('/user/:id (DELETE) - success', (done) => {
    request(app.getHttpServer())
      .delete('/user/' + createdId)
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .end(done);
  });

  it('/auth/login (POST) - success', (done) => {
    request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.access_token).toBeDefined();
        done();
      })
      .catch(() => {
        throw new Error('Login failed');
      });
  });

  it('/auth/register (POST) - fail', (done) => {
    request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, email: 'ru.ru' })
      .expect(401, {
        statusCode: 401,
        message: 'User with that email not found',
        error: 'Unauthorized',
      })
      .end(done);
  });

  afterAll(() => {
    disconnect();
  });
});
