import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiService } from './api.service';
import { CreateProductRequest } from './dto/create.product';

@Controller({ path: 'products' })
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post()
  create(@Body() product: CreateProductRequest): Record<any, string> {
    this.apiService.createProduct(product);

    return {
      message: 'Created Product Successfully',
    };
  }

  @Put(':id')
  updateProduct(
    @Body() product: CreateProductRequest,
    @Param('id') id: string,
  ) {
    this.apiService.updateProduct(product, id);
    return {
      message: 'Updated Product Successfully',
    };
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    this.apiService.deleteProduct(id);
    return {
      message: 'Deleted Product Successfully',
    };
  }

  @Post('create-index')
  createProductIndex() {
    this.apiService.createProductIndex();
  }

  @Post('update-index')
  updateProductIndex() {
    this.apiService.updateProductIndex();
  }

  @Get('')
  async searchProducts(@Query('q') query: string) {
    const results = await this.apiService.searchProduct(query);
    return {
      results,
    };
  }
}
