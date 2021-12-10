import { ProductModel } from './../product/product.model';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema({ _id: false })
class Test {
  @Prop()
  name: string;

  @Prop()
  value: number;
}

@Schema({ timestamps: true })
export class ReviewModel {
  @Prop()
  name: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  rating: number;

  @Prop({ type: SchemaTypes.ObjectId, ref: ProductModel.name })
  product: ProductModel | string;

  @Prop([Test])
  obj: Test[];
}

export type ReviewModelDocument = ReviewModel & Document;
export const ReviewModelSchema = SchemaFactory.createForClass(ReviewModel);
