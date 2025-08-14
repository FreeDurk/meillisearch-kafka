import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './models/products.entity';
import { Repository } from 'typeorm';
import { CreateProductRequest } from './dto/create.product';
import { ClientKafka } from '@nestjs/microservices';
import { InjectMeiliSearch } from 'nestjs-meilisearch';
import { Meilisearch } from 'meilisearch';

@Injectable()
export class ApiService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    @InjectMeiliSearch() private readonly meiliClient: Meilisearch,
  ) {}

  async createProduct(data: CreateProductRequest) {
    const result = this.productRepo.create(data);
    await this.productRepo.save(result);

    this.kafkaClient.emit('index-product', result);
  }

  async updateProduct(data: CreateProductRequest, id: string) {
    await this.productRepo.update(id, data);

    const result = await this.productRepo.findOneBy({ id: id });

    this.kafkaClient.emit('index-product', result);
  }

  async deleteProduct(id: string) {
    await this.productRepo.delete({ id });

    this.kafkaClient.emit('index-product-delete', id);
  }

  async createProductIndex() {
    await this.meiliClient.createIndex('products', { primaryKey: 'id' });
  }

  async updateProductIndex() {
    await this.meiliClient.index('products').updateSortableAttributes(['name']);
  }

  async searchProduct(query: string) {
    const results = await this.meiliClient.index('products').search(query, {
      attributesToHighlight: ['name', 'description'],
      showRankingScore: true,
    });

    return results;
  }
}
