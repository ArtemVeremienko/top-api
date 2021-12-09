import { TopPageModel, TopPageModelSchema } from './top-page.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TopPageModel.name, schema: TopPageModelSchema },
    ]),
  ],
  controllers: [TopPageController],
})
export class TopPageModule {}
