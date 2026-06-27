import { IsString, IsNotEmpty, IsNumber, Min, IsOptional, IsDateString } from 'class-validator';

export class CreateCommissionDto {
  @IsString({ message: 'O título deve ser um texto válido' })
  @IsNotEmpty({ message: 'O título é obrigatório' })
  title: string;

  @IsString({ message: 'A descrição deve ser um texto válido' })
  @IsNotEmpty({ message: 'A descrição é obrigatória' })
  description: string;

  @IsNumber({}, { message: 'O preço deve ser um número' })
  @Min(0.01, { message: 'O preço mínimo é 0.01' })
  price: number;

  @IsDateString({}, { message: 'O prazo deve ser uma data válida (ISO 8601)' })
  @IsOptional()
  deadline?: string;

  @IsString({ message: 'O ID do cliente deve ser um texto válido' })
  @IsNotEmpty({ message: 'O ID do cliente é obrigatório' })
  clientId: string;

  @IsString({ message: 'O ID do artista deve ser um texto válido' })
  @IsNotEmpty({ message: 'O ID do artista é obrigatório' })
  artistId: string;
}
