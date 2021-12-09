import { AuthModel, AuthModelSchema } from './auth.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AuthModel.name, schema: AuthModelSchema },
    ]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
