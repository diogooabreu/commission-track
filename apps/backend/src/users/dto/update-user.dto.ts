import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Role } from './create-user.dto';

export class UpdateUserDto {
  @IsString({ message: 'O nome deve ser um texto válido' })
  @IsNotEmpty({ message: 'O nome não pode ficar vazio' })
  @IsOptional()
  name?: string;

  @IsEmail({}, { message: 'Informe um e-mail válido' })
  @IsOptional()
  email?: string;

  @IsString({ message: 'A senha deve ser um texto válido' })
  @IsNotEmpty({ message: 'A senha não pode ficar vazia' })
  @IsOptional()
  password?: string;

  @IsEnum(Role, { message: 'O cargo deve ser ARTIST ou CLIENT' })
  @IsOptional()
  role?: Role;
}
