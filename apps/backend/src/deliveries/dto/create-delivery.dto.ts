import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateDeliveryDto {
  @IsString({ message: 'A URL do arquivo deve ser um texto válido' })
  @IsNotEmpty({ message: 'A URL do arquivo é obrigatória' })
  @IsUrl({}, { message: 'Informe uma URL válida para o arquivo' })
  fileUrl: string;

  @IsString({ message: 'As observações devem ser um texto válido' })
  @MaxLength(500, {
    message: 'As observações devem ter no máximo 500 caracteres',
  })
  @IsOptional()
  notes?: string;

  @IsUUID('4', { message: 'O ID da comissão deve ser um UUID válido' })
  @IsNotEmpty({ message: 'O ID da comissão é obrigatório' })
  commissionId: string;
}
