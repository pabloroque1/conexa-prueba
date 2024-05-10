import { Injectable } from '@nestjs/common';
import { MovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MovieRepository } from './repositories/movies.repository';

@Injectable()
export class MoviesService {
  constructor(private readonly movieRepository: MovieRepository) {}

  async find(): Promise<Movie[]> {
    return await this.movieRepository.findAll();
  }

  async findById(id: number) {
    const movieFinded = await this.movieRepository.findById(id);
    if (!movieFinded) {
      throw new Error('No se encontro la pelicula');
    }
    return movieFinded;
  }

  async insertMovies(movies: Movie[]) {
    return await this.movieRepository.insertMany(movies);
  }

  async create(movie: MovieDTO) {
    const movieToCreate = new Movie();
    movieToCreate.director = movie.director;
    movieToCreate.episode_id = movie.episode_id;
    movieToCreate.producer = movie.producer;
    movieToCreate.release_date = movie.release_date;
    movieToCreate.title = movie.title;
    return await this.movieRepository.create(movieToCreate);
  }

  async delete(id: number) {
    const movieFinded = await this.movieRepository.findById(id);
    if (!movieFinded) {
      throw new Error('No se pudo encontrar una pelicula con ese ID');
    }
    return await this.movieRepository.delete(id);
  }

  async update(id: number, updateMovieDTO: UpdateMovieDTO) {
    const movieFinded = await this.movieRepository.findById(id);
    if (!movieFinded) {
      throw new Error('No se pudo encontrar una pelicula con ese ID');
    }
    return await this.movieRepository.update(movieFinded, updateMovieDTO);
  }
}
