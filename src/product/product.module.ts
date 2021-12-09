import { ProductModel, ProductModelSchema } from './product.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductModel.name, schema: ProductModelSchema },
    ]),
  ],
  controllers: [ProductController],
})
export class ProductModule {}
