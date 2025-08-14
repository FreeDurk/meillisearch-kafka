import { Injectable } from '@nestjs/common';
import { CreateProductRequest } from 'apps/api/src/dto/create.product';
import { Meilisearch } from 'meilisearch';
import { InjectMeiliSearch } from 'nestjs-meilisearch';

@Injectable()
export class MeiliIndexingService {
  constructor(@InjectMeiliSearch() private readonly meiliClient: Meilisearch) {}

  async addProduct(products: CreateProductRequest[]) {
    await this.meiliClient.index('products').addDocuments(products);
  }

  async deleteProductIndex(id: any) {
    await this.meiliClient.index('products').deleteDocument(id);
  }
}
