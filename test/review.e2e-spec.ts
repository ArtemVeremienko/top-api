import { REVIEW_NOT_FOUND } from './../src/review/review.constants';
import { CreateReviewDto } from './../src/review/dto/create-review.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, NotFoundException } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { disconnect, Types } from 'mongoose';

const generateObjectId = () => new Types.ObjectId().toHexString();

const productId = generateObjectId();

const testDto: CreateReviewDto = {
  name: 'Test',
  title: 'Heading',
  description: 'Lorem ipsum dolar',
  rating: 3,
  product: productId,
};

describe('ReviewController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/review/create (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send(testDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdId = body._id;
        expect(createdId).toBeDefined();
      });
  });

  it('/review/create (POST) - fail', async () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send({ ...testDto, rating: 0 })
      .expect(400)
      .then(({ body }: request.Response) => {
        console.log(body);
      });
  });

  it('/review/byProduct/:productId (GET)', async () => {
    return request(app.getHttpServer())
      .get(`/review/byProduct/${productId}`)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(1);
      });
  });

  it('/review/create/:id (DELETE) - success', () => {
    return request(app.getHttpServer())
      .delete(`/review/${createdId}`)
      .expect(204);
  });

  it('/review/create/:id (DELETE) - fail', () => {
    return request(app.getHttpServer())
      .delete(`/review/${generateObjectId()}`)
      .expect(404, {
        statusCode: 404,
        message: REVIEW_NOT_FOUND,
        error: 'Not Found',
      });
  });

  afterAll(() => {
    disconnect();
  });
});
