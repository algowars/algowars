import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('ProblemController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // get problems pageable
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/v1/problem')
      .expect(200)
      .expect('Hello World!');
  });

  // create problems

  // update problem
});
