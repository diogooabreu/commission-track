import { IsString, IsNotEmpty, IsNumber, Min, IsOptional, IsDateString } from 'class-validator';

export class UpdateCommissionDto {
  @IsString({ message: 'O título deve ser um texto válido' })
  @IsNotEmpty({ message: 'O título não pode ficar vazio' })
  @IsOptional()
  title?: string;

  @IsString({ message: 'A descrição deve ser um texto válido' })
  @IsNotEmpty({ message: 'A descrição não pode ficar vazia' })
  @IsOptional()
  description?: string;

  @IsNumber({}, { message: 'O preço deve ser um número' })
  @Min(0.01, { message: 'O preço mínimo é 0.01' })
  @IsOptional()
  price?: number;

  @IsDateString({}, { message: 'O prazo deve ser uma data válida (ISO 8601)' })
  @IsOptional()
  deadline?: string;
}
