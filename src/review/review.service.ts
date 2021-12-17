import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewModel, ReviewModelDocument } from './review.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(ReviewModel.name)
    private reviewModel: Model<ReviewModelDocument>,
  ) {}

  async create(dto: CreateReviewDto): Promise<ReviewModelDocument> {
    return this.reviewModel.create(dto);
  }

  async delete(id: string): Promise<ReviewModelDocument | null> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  async findByProductId(productId: string): Promise<ReviewModelDocument[]> {
    return this.reviewModel.find({ productId }).exec();
  }

  async deleteByProductId(productId: string) {
    return this.reviewModel.deleteMany({ productId }).exec();
  }
}
