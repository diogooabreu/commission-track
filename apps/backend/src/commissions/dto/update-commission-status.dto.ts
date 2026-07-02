import { IsEnum, IsNotEmpty } from 'class-validator';

export enum CommissionStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  WAITING_PAYMENT = 'WAITING_PAYMENT',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export class UpdateCommissionStatusDto {
  @IsEnum(CommissionStatus, { message: 'Status inválido' })
  @IsNotEmpty({ message: 'O status é obrigatório' })
  status: CommissionStatus;
}
