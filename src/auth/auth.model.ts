import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class AuthModel {
  @Prop({ unique: true })
  email: string;

  @Prop()
  passwordHash: string;
}

export type AuthModelDocument = AuthModel & Document;
export const AuthModelSchema = SchemaFactory.createForClass(AuthModel);
