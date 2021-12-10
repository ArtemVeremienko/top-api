import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { ReviewService } from './review.service';

describe('ReviewService', () => {
  let service: ReviewService;

  const exec = { exec: jest.fn() };

  const reviewRepositoryFactory = () => ({
    find: () => exec,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          useFactory: reviewRepositoryFactory,
          provide: getModelToken('ReviewModel'),
        },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findByProductId working', async () => {
    const id = new Types.ObjectId().toHexString();
    reviewRepositoryFactory()
      .find()
      .exec.mockReturnValueOnce([{ product: id }]);
    const res = await service.findByProductId(id);
    expect(res[0].product).toBe(id);
  });
});
