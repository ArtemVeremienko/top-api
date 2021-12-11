import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class UserModel {
  @Prop({ unique: true })
  email: string;

  @Prop()
  passwordHash: string;
}

export type UserModelDocument = UserModel & Document;
export const UserModelSchema = SchemaFactory.createForClass(UserModel);
