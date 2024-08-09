import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CATEGORY_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://uesqotnl:iQ6EfTPs_uaNCpoDCb37jUOzoQa2bgCf@cougar.rmq.cloudamqp.com/uesqotnl',
          ],
          queue: 'submit_jokes_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
