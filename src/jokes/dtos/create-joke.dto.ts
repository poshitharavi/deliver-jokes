import { IsNotEmpty, IsString } from 'class-validator';

export class CreateJokeDto {
  @IsNotEmpty()
  @IsString()
  jokeText: string;
  @IsNotEmpty()
  @IsString()
  author: string;
  @IsNotEmpty()
  @IsString()
  category: string;
  @IsNotEmpty()
  @IsString()
  moderator: string;
}
