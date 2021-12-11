import { IsEmail, IsString } from 'class-validator';
export class AuthDto {
  @IsEmail()
  login: string;

  @IsString()
  password: string;
}
