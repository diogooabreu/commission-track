import { IsString, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export enum Role {
  ARTIST = 'ARTIST',
  CLIENT = 'CLIENT',
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  role: Role;
}
