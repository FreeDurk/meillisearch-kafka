import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './models/products.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MeiliSearchModule } from 'nestjs-meilisearch';
import { Movie } from './models/movie.entity';
import { Torrent } from './models/torrent.entity';
import { MovieService } from './movie/movie.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    MeiliSearchModule.forRoot({
      host: 'http://127.0.0.1:7700',
      apiKey: 'SAMPLE_MASTER_KEY',
    }),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
        },
      },
    ]),
    TypeOrmModule.forRoot({
      database: 'shopee',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'shopee',
      password: 'root',
      entities: [Product,Movie,Torrent],
      synchronize: true,
    }),

    TypeOrmModule.forFeature([Product,Movie,Torrent]),
  ],
  controllers: [ApiController],
  providers: [ApiService, MovieService],
})
export class ApiModule {}
