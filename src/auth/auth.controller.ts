import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';
import { Public } from '../common/decorators/public';
import { Role } from '../common/decorators/role';
import { Roles } from '../users/enum/roles.enum';
import { AuthService } from './auth.service';
import { signUpDTO } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() userSignUp: signUpDTO) {
    try {
      return this.authService.signUp(userSignUp.username, userSignUp.password);
    } catch (error) {
      console.log(error);
    }
  }

  @Role(Roles.REGULAR)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
