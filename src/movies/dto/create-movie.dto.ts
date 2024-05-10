import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MovieDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  episode_id: number;

  @IsString()
  @IsNotEmpty()
  director: string;

  @IsString()
  @IsNotEmpty()
  producer: string;

  @IsString()
  @IsNotEmpty()
  release_date: string;
}
