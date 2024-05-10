import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMovieDTO {
  @IsString()
  @IsOptional()
  title?: string;

  @IsNumber()
  @IsOptional()
  episode_id?: number;

  @IsString()
  @IsOptional()
  director?: string;

  @IsString()
  @IsOptional()
  producer?: string;

  @IsString()
  @IsOptional()
  release_date?: string;
}
