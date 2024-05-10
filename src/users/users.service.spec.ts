import { Test, TestingModule } from '@nestjs/testing';
import { Roles } from './enum/roles.enum';
import { UserRepository } from './repositories/user.repository';
import { User, UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserRepository,
          useValue: {
            findOne: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('Debe retornar un usuario si lo encontro', async () => {
      const username = 'pablo';
      const user: User = { username, password: 'asdasd', role: Roles.REGULAR };

      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(user);

      const result = await service.findOne(username);

      expect(result).toEqual(user);
    });

    it('Debe retornar undefined si no existe el usuario', async () => {
      const username = 'noexiste';

      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined);

      const result = await service.findOne(username);

      expect(result).toBeUndefined();
    });
  });

  describe('createUser', () => {
    it('Debe crear un usuario', async () => {
      const username = 'pablo';
      const password = 'pablo';

      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined);
      jest.spyOn(userRepository, 'create').mockResolvedValueOnce({
        id: 1,
        username,
        password,
        role: Roles.REGULAR,
        created_at: new Date(),
        updated_at: new Date(),
      });

      const result = await service.createUser(username, password);
      expect(result).toEqual({
        id: 1,
        username,
        password,
        role: Roles.REGULAR,
        created_at: new Date(),
        updated_at: new Date(),
      });
    });
  });
});
