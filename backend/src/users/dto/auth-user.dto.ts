import { IsEmail, IsString, Length } from 'class-validator';

export class AuthUserDto {
  @IsEmail()
  login: string;

  @IsString()
  @Length(8, 140)
  password: string;
}
