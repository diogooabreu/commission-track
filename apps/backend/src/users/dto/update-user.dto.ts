import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsOptional,
  MinLength,
  Matches,
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
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  @Matches(/(?=.*[a-z])/, {
    message: 'A senha deve conter pelo menos uma letra minúscula',
  })
  @Matches(/(?=.*[A-Z])/, {
    message: 'A senha deve conter pelo menos uma letra maiúscula',
  })
  @Matches(/(?=.*\d)/, {
    message: 'A senha deve conter pelo menos um número',
  })
  @IsOptional()
  password?: string;

  @IsEnum(Role, { message: 'O cargo deve ser ARTIST ou CLIENT' })
  @IsOptional()
  role?: Role;
}
