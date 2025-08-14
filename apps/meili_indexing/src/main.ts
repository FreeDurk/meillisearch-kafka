import { NestFactory } from '@nestjs/core';
import { MeiliIndexingModule } from './meili_indexing.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MeiliIndexingModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'product-indexing-consumer',
        },
      },
    },
  );
  await app.listen();

  Logger.log('MeilliSearch Indexing is Running....');
}
bootstrap();
