import { REVIEW_NOT_FOUND } from './review.constants';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedDoc = await this.reviewService.delete(id);
    if (!deletedDoc) {
      throw new NotFoundException(REVIEW_NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('byProduct/:productId')
  async getByProduct(@Param('productId') productId: string) {
    return this.reviewService.findByProductId(productId);
  }
}
