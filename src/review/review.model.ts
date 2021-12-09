import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
}

export type ReviewModelDocument = ReviewModel & Document;
export const ReviewModelSchema = SchemaFactory.createForClass(ReviewModel);
