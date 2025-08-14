import { Module } from '@nestjs/common';
import { MeiliIndexingController } from './meili_indexing.controller';
import { MeiliIndexingService } from './meili_indexing.service';
import { MeiliSearchModule } from 'nestjs-meilisearch';

@Module({
  imports: [
    MeiliSearchModule.forRoot({
      host: 'http://127.0.0.1:7700',
      apiKey: 'SAMPLE_MASTER_KEY',
    }),
  ],
  controllers: [MeiliIndexingController],
  providers: [MeiliIndexingService],
})
export class MeiliIndexingModule {}
