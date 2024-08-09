import { Module } from '@nestjs/common';
import { JokesController } from './jokes.controller';
import { JokesService } from './jokes.service';
import { CategoryService } from 'src/category/category.service';

@Module({
  controllers: [JokesController],
  providers: [JokesService, CategoryService],
})
export class JokesModule {}
