import { IsString, IsNotEmpty, IsNumber, Min, IsOptional, IsDateString } from 'class-validator';

export class CreateCommissionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0.01)
  price: number;

  @IsDateString()
  @IsOptional()
  deadline?: string;

  @IsString()
  @IsNotEmpty()
  clientId: string;

  @IsString()
  @IsNotEmpty()
  artistId: string;
}
