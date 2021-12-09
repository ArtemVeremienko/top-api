import { ReviewModel, ReviewModelSchema } from './review.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ReviewModel.name, schema: ReviewModelSchema },
    ]),
  ],
  controllers: [ReviewController],
})
export class ReviewModule {}
