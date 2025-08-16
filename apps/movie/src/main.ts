import { NestFactory } from '@nestjs/core';
import { MovieModule } from './movie.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
 const app = await NestFactory.createMicroservice<MicroserviceOptions>(
     MovieModule,
     {
       transport: Transport.KAFKA,
       options: {
         client: {
           brokers: ['localhost:9092'],
         },
         consumer: {
           groupId: 'process-movie-consumer',
         },
       },
     },
   );
  await app.listen();

  Logger.log('Movie Service is Running....');
}
bootstrap();
