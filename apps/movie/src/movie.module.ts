import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MeiliSearchModule } from 'nestjs-meilisearch';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'apps/api/src/models/movie.entity';
import { Torrent } from 'apps/api/src/models/torrent.entity';

@Module({
  imports: [
    MeiliSearchModule.forRoot({
      host: 'http://127.0.0.1:7700',
      apiKey: 'SAMPLE_MASTER_KEY',
    }),
    TypeOrmModule.forRoot({
      database: 'shopee',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'shopee',
      password: 'root',
      entities: [Movie, Torrent],
      synchronize: false,
    }),

    TypeOrmModule.forFeature([Movie, Torrent]),
  ],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule { }
