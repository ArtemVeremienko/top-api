import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductModel } from './product.model';
import { PRODUCT_NOT_FOUND_ERROR } from './product.constants';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const product = await this.productService.findById(id);
    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
    }
    return product;
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedProduct = await this.productService.deleteById(id);
    if (!deletedProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
    }
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: ProductModel) {
    const updetedProduct = await this.productService.updateById(id, dto);
    if (!updetedProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
    }
    return updetedProduct;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindProductDto) {
    return this.productService.findWithReviews(dto);
  }
}
