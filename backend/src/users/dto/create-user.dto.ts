import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(11, 30)
  document: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(9, 20)
  phone: string;

  @IsString()
  @Length(3, 140)
  name: string;

  @IsString()
  password: string;
}
