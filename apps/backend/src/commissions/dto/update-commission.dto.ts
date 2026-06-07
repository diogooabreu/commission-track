import { IsString, IsNumber, Min, IsOptional, IsDateString } from 'class-validator';

export class UpdateCommissionDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0.01)
  @IsOptional()
  price?: number;

  @IsDateString()
  @IsOptional()
  deadline?: string;
}
