import { IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class RedInvoiceDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly address: string;

  @IsString()
  readonly district: string;

  @IsString()
  readonly city: string;

  @IsString()
  readonly taxCode: string;
}

export default class UpdateStoreDto {
  @IsString()
  readonly logoUrl: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly address: string;

  @IsString()
  readonly district: string;

  @IsString()
  readonly city: string;


  @IsString()
  readonly phone: string;

  @Type(() => RedInvoiceDto)
  redInvoice: RedInvoiceDto
}