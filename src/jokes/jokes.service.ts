import { Injectable } from '@nestjs/common';
import { Joke } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJokeDto } from './dtos/create-joke.dto';

@Injectable()
export class JokesService {
  constructor(private prisma: PrismaService) {}

  // Get a random approved joke
  async getRandomJoke(): Promise<Joke> {
    const jokes = await this.prisma.joke.findMany();

    const randomIndex = Math.floor(Math.random() * jokes.length);
    return jokes[randomIndex];
  }

  // Get jokes by category
  async getJokesByCategory(category: string): Promise<Joke[]> {
    return this.prisma.joke.findMany({
      where: {
        category,
      },
    });
  }

  // Create a new joke (used when syncing from Submit Jokes service)
  async createJoke(createJokeDto: CreateJokeDto): Promise<Joke> {
    return this.prisma.joke.create({
      data: createJokeDto,
    });
  }
}
