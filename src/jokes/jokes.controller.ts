import {
  Body,
  ConflictException,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { JokesService } from './jokes.service';
import { Response } from 'express';
import { CreateJokeDto } from './dtos/create-joke.dto';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { CategoryService } from 'src/category/category.service';
import { EventPattern } from '@nestjs/microservices';

@Controller('jokes')
export class JokesController {
  private readonly logger = new Logger(JokesController.name);

  constructor(
    private readonly jokeService: JokesService,
    private readonly categoryService: CategoryService,
  ) {}

  @Post('create')
  async createNewJoke(
    @Res() response: Response,
    @Body() createJokeDto: CreateJokeDto,
  ): Promise<any> {
    try {
      const newJoke = await this.jokeService.createJoke(createJokeDto);

      // Add the category
      // await this.categoryService.createCategory({
      //   name: createJokeDto.category,
      //   description: createJokeDto.category,
      // });

      return response.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: 'Successfully created new joke',
        body: {
          newJoke,
        },
      });
    } catch (error) {
      this.logger.error(`Error at /jokes/create: ${error.message}`);
      if (error instanceof ConflictException) {
        // Handle UnauthorizedException differently
        return response.status(StatusCodes.CONFLICT).json({
          message: error.message,
          error: getReasonPhrase(StatusCodes.CONFLICT),
          statusCode: StatusCodes.CONFLICT,
        });
      }
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Something went wrong',
        error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }
  @EventPattern('jokeCreate')
  async createNewJokeByEventPattern(
    createJokeDto: CreateJokeDto,
  ): Promise<void> {
    try {
      const newJoke = await this.jokeService.createJoke(createJokeDto);

      // Add the category
      await this.categoryService.createCategory({
        name: createJokeDto.category,
        description: createJokeDto.category,
      });

      console.log(`Successfully created new joke`, newJoke);
    } catch (error) {
      console.log(error);
    }
  }

  @Get('random')
  async getRandomJoke(@Res() response: Response): Promise<any> {
    try {
      const joke = await this.jokeService.getRandomJoke();

      return response.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: 'Successfully retrieved random joke',
        body: {
          joke,
        },
      });
    } catch (error) {
      this.logger.error(`Error at /category/create: ${error.message}`);
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Something went wrong',
        error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }

  @Get('category/:category')
  async getJokesByCategory(
    @Res() response: Response,
    @Param('category') category: string,
  ): Promise<any> {
    try {
      const jokes = await this.jokeService.getJokesByCategory(category);

      return response.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: 'Successfully retrieved jokes for category ' + category,
        body: {
          jokes,
        },
      });
    } catch (error) {
      this.logger.error(`Error at /category/${category}: ${error.message}`);
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Something went wrong',
        error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
