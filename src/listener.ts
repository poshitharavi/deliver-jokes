import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqps://uesqotnl:iQ6EfTPs_uaNCpoDCb37jUOzoQa2bgCf@cougar.rmq.cloudamqp.com/uesqotnl',
      ],
      queue: 'delivery_jokes_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.listen();
  console.log('Submit Jokes Microservice listening');
}
bootstrap();
