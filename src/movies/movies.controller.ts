import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Public } from '../common/decorators/public';
import { Role } from '../common/decorators/role';
import { Roles } from '../users/enum/roles.enum';
import { MovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get('')
  @Public()
  async listOfMovies() {
    try {
      const movies = await this.movieService.find();
      return movies;
    } catch (error) {}
  }

  @Get(':id')
  @Role(Roles.REGULAR)
  async movieById(@Param('id') id: number) {
    try {
      const movies = await this.movieService.findById(id);
      return movies;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  @Post()
  @Role(Roles.ADMIN)
  async createMovie(@Body() movieDto: MovieDTO) {
    try {
      const movie = await this.movieService.create(movieDto);
      return movie;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  @Role(Roles.ADMIN)
  async deleteMovie(@Param('id') id: number) {
    try {
      const movie = await this.movieService.delete(id);
      return movie;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  @Put(':id')
  @Role(Roles.ADMIN)
  async updateMovie(@Param('id') id: number, @Body() movieDto: UpdateMovieDTO) {
    try {
      const updatedMovie = await this.movieService.update(id, movieDto);
      return updatedMovie;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }
}
