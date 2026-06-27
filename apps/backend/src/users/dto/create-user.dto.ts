import { IsString, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export enum Role {
  ARTIST = 'ARTIST',
  CLIENT = 'CLIENT',
}

export class CreateUserDto {
  @IsString({ message: 'O nome deve ser um texto válido' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @IsEmail({}, { message: 'Informe um e-mail válido' })
  email: string;

  @IsString({ message: 'A senha deve ser um texto válido' })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  password: string;

  @IsEnum(Role, { message: 'O cargo deve ser ARTIST ou CLIENT' })
  role: Role;
}
