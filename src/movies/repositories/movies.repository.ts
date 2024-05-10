import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateMovieDTO } from '../dto/update-movie.dto';
import { Movie } from '../entities/movie.entity';

@Injectable()
export class MovieRepository {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async findAll() {
    return this.movieRepository.find();
  }

  async findById(id: number) {
    return this.movieRepository.findOne({ where: { id } });
  }

  async insertMany(movies: Movie[]) {
    return this.movieRepository.insert(movies);
  }

  async create(movie: Movie) {
    try {
      const entity = await this.movieRepository.create(movie);
      return this.movieRepository.save(entity);
    } catch (error) {
      throw new Error('Error en la creacion de pelicula');
    }
  }

  async delete(id: number) {
    return await this.movieRepository.delete({ id });
  }

  async update(movie: Movie, movieDto: UpdateMovieDTO) {
    try {
      Object.assign(movie, movieDto);

      return await this.movieRepository.save(movie);
    } catch (error) {
      throw new Error('Error al actualizar la película');
    }
  }
}
