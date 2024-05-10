import { IsNotEmpty, IsString } from 'class-validator';

export class signUpDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
