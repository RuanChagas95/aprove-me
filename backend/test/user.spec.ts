import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { UsersModule } from '../src/users/users.module';
import { UsersService } from '../src/users/users.service';
import * as jwtUtils from '../src/utils/jwt';
import { CommonUser } from '../src/types';

const userMock = {
  id: 'fc9b8d1b-fde0-46a6-8b04-3e39a26a90cd',
  name: 'username test',
  email: 'username@test.com',
  password: '12345678',
  phone: '123456789',
  document: '12345678901',
};
const user = {
  mock: null,
};
describe('Users ccontroller tests', () => {
  let app: INestApplication;
  const userService = {
    create: () => user.mock,
    findOne: () => user.mock,
    auth: () => user.mock,
  };

  beforeEach(() => {
    user.mock = { user: userMock };
    jest.clearAllMocks();
  });

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(UsersService)
      .useValue(userService)
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
  });

  describe(`Assignor POST route tests`, () => {
    describe(`/POST /integrations/assignor/  Bad Request`, () => {
      const mock = { ...userMock };
      delete mock.id;
      Object.keys(mock).forEach((key) => {
        it(`/POST /integrations/assignor/  nullable test ${key} key`, () => {
          return request(app.getHttpServer())
            .post('/integrations/assignor/')
            .send({
              ...userMock,
              [key]: null,
            })
            .expect(HttpStatus.BAD_REQUEST)
            .expect((res) => {
              expect(res.body.token).not.toBeDefined();
            });
        });
        it(`/POST /integrations/assignor/  small string test ${key} key`, () => {
          return request(app.getHttpServer())
            .post('/integrations/assignor/')
            .send({
              ...userMock,
              [key]: 'aa',
            })
            .expect(HttpStatus.BAD_REQUEST)
            .expect((res) => {
              expect(res.body.token).not.toBeDefined();
            });
        });
      });

      it(`/POST /integrations/assignor/  invalid email`, () => {
        return request(app.getHttpServer())
          .post('/integrations/assignor/')
          .send({
            ...userMock,
            email: 'test.com@provider',
          })
          .expect(HttpStatus.BAD_REQUEST)
          .expect((res) => {
            expect(res.body.token).not.toBeDefined();
          });
      });
    });

    it(`/POST /integrations/assignor/  Success`, () => {
      return request(app.getHttpServer())
        .post('/integrations/assignor/')
        .expect(HttpStatus.CREATED)
        .send(userMock)
        .expect((res) => {
          expect(res.body.user).toEqual(userService.create().user);
          expect(res.body.token).toBeDefined();
        });
    });

    it(`/POST /integrations/assignor/  Conflict`, () => {
      user.mock = null;
      return request(app.getHttpServer())
        .post('/integrations/assignor/')
        .send(userMock)
        .expect(HttpStatus.CONFLICT)
        .expect({
          statusCode: HttpStatus.CONFLICT,
          message: 'User already exists',
        });
    });
  });

  it(`/GET /integrations/assignor/:id  Success`, () => {
    jest.spyOn(jwtUtils, 'verifyJWT').mockReturnValue(userMock as CommonUser);
    return request(app.getHttpServer())
      .get(`/integrations/assignor/${userMock.id}/`)
      .set('authorization', 'Bearer token')
      .expect(HttpStatus.OK)
      .expect((res) => {
        expect(res.body.user).toEqual(userMock);
        expect(res.body.token).toBeDefined();
      });
  });

  it(`/GET /integrations/assignor/:id  without token`, () => {
    user.mock = null;
    jest.spyOn(jwtUtils, 'verifyJWT').mockReturnValue(userMock as CommonUser);
    return request(app.getHttpServer())
      .get(`/integrations/assignor/${userMock.id}/`)
      .expect(HttpStatus.UNAUTHORIZED)
      .expect((res) => {
        expect(res.body.token).not.toBeDefined();
      });
  });

  it(`/POST /integrations/assignor/auth  Success`, () => {
    return request(app.getHttpServer())
      .post('/integrations/auth/')
      .send({ login: userMock.email, password: userMock.password })
      .expect(HttpStatus.OK)
      .expect((res) => {
        expect(res.body.user).toEqual(userMock);
        expect(res.body.token).toBeDefined();
      });
  });

  it(`/POST /integrations/assignor/auth  Unauthorized`, () => {
    user.mock = null;
    return request(app.getHttpServer())
      .post('/integrations/auth/')
      .send({ login: userMock.email, password: userMock.password })
      .expect(HttpStatus.UNAUTHORIZED)
      .expect((res) => {
        expect(res.body).toEqual({
          message: 'Unauthorized',
          statusCode: HttpStatus.UNAUTHORIZED,
        });
        expect(res.body.token).not.toBeDefined();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
