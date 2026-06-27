import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateDeliveryDto {
  @IsString({ message: 'A URL do arquivo deve ser um texto válido' })
  @IsNotEmpty({ message: 'A URL do arquivo é obrigatória' })
  @IsUrl({}, { message: 'Informe uma URL válida para o arquivo' })
  fileUrl: string;

  @IsString({ message: 'As observações devem ser um texto válido' })
  @IsOptional()
  notes?: string;

  @IsString({ message: 'O ID da comissão deve ser um texto válido' })
  @IsNotEmpty({ message: 'O ID da comissão é obrigatório' })
  commissionId: string;
}
