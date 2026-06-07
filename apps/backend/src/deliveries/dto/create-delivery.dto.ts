import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateDeliveryDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  fileUrl: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsNotEmpty()
  commissionId: string;
}
