import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

/** Public */
describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn(),
            signUp: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('Debe retornar un acces token si se loguea', async () => {
      const signInDto = { username: 'pablo', password: 'pablo' };
      const accessToken = 'ASDASDASDASDASDASDASD';
      jest.spyOn(authService, 'signIn').mockResolvedValue(accessToken);

      const result = await controller.signIn(signInDto);

      expect(result).toEqual(accessToken);
    });
  });

  describe('signUp', () => {
    it('Mensaje de usuario creado al registrarse', async () => {
      const signUpDto = { username: 'pablo', password: 'pablo' };
      const successMessage = 'Usuario creado';
      jest.spyOn(authService, 'signUp').mockResolvedValue(successMessage);

      const result = await controller.signUp(signUpDto);

      expect(result).toEqual(successMessage);
    });
  });
});
