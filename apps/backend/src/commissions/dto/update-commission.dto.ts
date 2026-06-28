import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional,
  IsDateString,
  MaxLength,
} from 'class-validator';
import { IsFutureDate } from '../../common/decorators/is-future-date.decorator';

export class UpdateCommissionDto {
  @IsString({ message: 'O título deve ser um texto válido' })
  @IsNotEmpty({ message: 'O título não pode ficar vazio' })
  @MaxLength(200, { message: 'O título deve ter no máximo 200 caracteres' })
  @IsOptional()
  title?: string;

  @IsString({ message: 'A descrição deve ser um texto válido' })
  @IsNotEmpty({ message: 'A descrição não pode ficar vazia' })
  @MaxLength(2000, {
    message: 'A descrição deve ter no máximo 2000 caracteres',
  })
  @IsOptional()
  description?: string;

  @IsNumber({}, { message: 'O preço deve ser um número' })
  @Min(0.01, { message: 'O preço mínimo é 0.01' })
  @IsOptional()
  price?: number;

  @IsDateString({}, { message: 'O prazo deve ser uma data válida (ISO 8601)' })
  @IsFutureDate({ message: 'O prazo deve ser uma data no futuro' })
  @IsOptional()
  deadline?: string;
}
