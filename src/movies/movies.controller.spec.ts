import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DeleteResult } from 'typeorm';
import { MovieDTO } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MovieRepository } from './repositories/movies.repository';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;
  const movieRepositoryMockFactory = () => ({
    findAll: jest.fn(),
    findById: jest.fn(),
    insertMany: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        MoviesService,
        {
          provide: MovieRepository,
          useValue: movieRepositoryMockFactory,
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('listOfMovies', () => {
    it('Debe retornar un listado de peliculas', async () => {
      const movies: Movie[] = [
        {
          id: 1,
          title: 'Movie 1',
          episode_id: 2,
          director: 'Primero',
          producer: 'Segundo',
          release_date: '16/05/2024',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];
      jest.spyOn(service, 'find').mockResolvedValueOnce(movies);

      expect(await controller.listOfMovies()).toEqual(movies);
    });
  });

  describe('movieById', () => {
    it('Debe retornar una pelicula si la encuentra por ID', async () => {
      const movie = {
        id: 1,
        title: 'Movie 1',
        episode_id: 2,
        director: 'Primero',
        producer: 'Segundo',
        release_date: '16/05/2024',
        created_at: new Date(),
        updated_at: new Date(),
      };
      jest.spyOn(service, 'findById').mockResolvedValueOnce(movie);

      expect(await controller.movieById(1)).toEqual(movie);
    });

    it('Debe retornar un bad request si no encuentra la peli por id', async () => {
      jest.spyOn(service, 'findById').mockRejectedValueOnce(new BadRequestException());

      await expect(controller.movieById(2)).rejects.toThrow(BadRequestException);
    });
  });

  describe('createMovie', () => {
    it('Debe crear una pelicula', async () => {
      const movieDto: MovieDTO = {
        title: 'Movie 1',
        episode_id: 2,
        director: 'Primero',
        producer: 'Segundo',
        release_date: '16/05/2024',
      };
      const createdMovie = { id: 1, created_at: new Date(), updated_at: new Date(), ...movieDto };
      jest.spyOn(service, 'create').mockResolvedValueOnce(createdMovie);

      expect(await controller.createMovie(movieDto)).toEqual(createdMovie);
    });
  });

  describe('deleteMovie', () => {
    it('Debe borrar una pelicula por id', async () => {
      const movieId = 1;
      jest.spyOn(service, 'delete').mockResolvedValueOnce(new DeleteResult());

      expect(await controller.deleteMovie(movieId)).toEqual(new DeleteResult());
    });
  });
});
