import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional,
  IsDateString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { IsFutureDate } from '../../common/decorators/is-future-date.decorator';

export class CreateCommissionDto {
  @IsString({ message: 'O título deve ser um texto válido' })
  @IsNotEmpty({ message: 'O título é obrigatório' })
  @MaxLength(200, { message: 'O título deve ter no máximo 200 caracteres' })
  title: string;

  @IsString({ message: 'A descrição deve ser um texto válido' })
  @IsNotEmpty({ message: 'A descrição é obrigatória' })
  @MaxLength(2000, {
    message: 'A descrição deve ter no máximo 2000 caracteres',
  })
  description: string;

  @IsNumber({}, { message: 'O preço deve ser um número' })
  @Min(0.01, { message: 'O preço mínimo é 0.01' })
  price: number;

  @IsDateString({}, { message: 'O prazo deve ser uma data válida (ISO 8601)' })
  @IsFutureDate({ message: 'O prazo deve ser uma data no futuro' })
  @IsOptional()
  deadline?: string;

  @IsUUID('4', { message: 'O ID do cliente deve ser um UUID válido' })
  @IsOptional()
  clientId?: string;

  @IsUUID('4', { message: 'O ID do artista deve ser um UUID válido' })
  @IsOptional()
  artistId?: string;
}
