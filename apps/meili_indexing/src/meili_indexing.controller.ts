import { Controller, Logger } from '@nestjs/common';
import { MeiliIndexingService } from './meili_indexing.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProductRequest } from 'apps/api/src/dto/create.product';

@Controller()
export class MeiliIndexingController {
  constructor(private readonly meiliIndexingService: MeiliIndexingService) {}

  @MessagePattern('index-product')
  productIndexing(@Payload() product: CreateProductRequest): void {
    Logger.log('Product Indexing...');
    this.meiliIndexingService.addProduct(product);
  }

  @MessagePattern('index-product-delete')
  removeProductIndexing(@Payload() id: any): void {
    Logger.log('Product Removing Index...');
    this.meiliIndexingService.deleteProductIndex(id);
  }
}
