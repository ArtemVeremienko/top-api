import { CreateProductDto } from './dto/create-product.dto';
import { ProductModel, ProductModelDocument } from './product.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FindProductDto } from './dto/find-product.dto';
import { ReviewModel } from 'src/review/review.model';

type ProductModelAggregate = ProductModelDocument & {
  review: ReviewModel[];
  reviewCount: number;
  reviewAvg: number;
};

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel.name)
    private readonly productModel: Model<ProductModelDocument>,
  ) {}

  async create(dto: CreateProductDto): Promise<ProductModelDocument> {
    return this.productModel.create(dto);
  }

  async findById(id: string): Promise<ProductModelDocument | null> {
    return this.productModel.findById(id).exec();
  }

  async deleteById(id: string): Promise<ProductModelDocument | null> {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: CreateProductDto) {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async findWithReviews(dto: FindProductDto): Promise<ProductModelAggregate[]> {
    return this.productModel
      .aggregate([
        {
          $match: { categories: dto.category },
        },
        {
          $sort: { _id: 1 },
        },
        {
          $limit: dto.limit,
        },
        {
          $lookup: {
            from: 'reviewmodels',
            localField: '_id',
            foreignField: 'productId',
            as: 'reviews',
          },
        },
        {
          $addFields: {
            reviewCount: { $size: '$reviews' },
            reviewAvg: { $avg: '$reviews.rating' },
          },
        },
      ])
      .exec();
  }
}
