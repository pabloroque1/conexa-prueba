import { Test, TestingModule } from '@nestjs/testing';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
import { MovieRepository } from './repositories/movies.repository';

describe('MoviesService', () => {
  let service: MoviesService;
  let movieRepository: MovieRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: MovieRepository,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            insertMany: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    movieRepository = module.get<MovieRepository>(MovieRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find', () => {
    it('Debe retornar un arreglo de peliculas', async () => {
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
      (movieRepository.findAll as jest.Mock).mockResolvedValueOnce(movies);

      const result = await service.find();

      expect(result).toEqual(movies);
    });
  });

  describe('findById', () => {
    it('Debe retornar una pelicula si se da un id', async () => {
      const movieId = 1;
      const movie: Movie = {
        id: 1,
        title: 'Movie 1',
        episode_id: 2,
        director: 'Primero',
        producer: 'Segundo',
        release_date: '16/05/2024',
        created_at: new Date(),
        updated_at: new Date(),
      };
      (movieRepository.findById as jest.Mock).mockResolvedValueOnce(movie);

      const result = await service.findById(movieId);

      expect(result).toEqual(movie);
    });

    it('Debe retornar un error si no encuentra la pelicula', async () => {
      const movieId = 999;
      (movieRepository.findById as jest.Mock).mockResolvedValueOnce(undefined);

      await expect(service.findById(movieId)).rejects.toThrow('No se encontro la pelicula');
    });
  });
});
