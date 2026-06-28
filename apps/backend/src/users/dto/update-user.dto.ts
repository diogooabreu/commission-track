import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsOptional,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { Role } from './create-user.dto';

export class UpdateUserDto {
  @IsString({ message: 'O nome deve ser um texto válido' })
  @IsNotEmpty({ message: 'O nome não pode ficar vazio' })
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  @IsOptional()
  name?: string;

  @IsEmail({}, { message: 'Informe um e-mail válido' })
  @MaxLength(255, { message: 'O e-mail deve ter no máximo 255 caracteres' })
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
