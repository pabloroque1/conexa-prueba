import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { Movie } from './movies/entities/movie.entity';
import { MoviesService } from './movies/movies.service';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private readonly movieService: MoviesService,
  ) {}
  async onApplicationBootstrap(): Promise<any> {
    const movies = await this.movieService.find();
    if (movies.length === 0) {
      let moviesToInsert = [];
      const peliculas = await lastValueFrom(this.httpService.get('https://swapi.dev/api/films/'));
      const peliculasToMapper = peliculas.data.results;
      peliculasToMapper.forEach((pelicula) => {
        const movie = new Movie();
        movie.episode_id = pelicula.episode_id;
        movie.title = pelicula.title;
        movie.director = pelicula.director;
        movie.producer = pelicula.producer;
        movie.release_date = pelicula.release_date;
        moviesToInsert.push(movie);
      });
      await this.movieService.insertMovies(moviesToInsert);
    }
  }
  getHello(): string {
    return 'Hello World!';
  }
}
