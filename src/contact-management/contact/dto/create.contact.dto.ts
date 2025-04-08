import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ContactCreateDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  mobile: string;

  @IsOptional()
  @IsString()
  position: string;

  @IsNotEmpty()
  @IsNumber()
  orgId: number;

  @IsOptional()
  @IsString()
  leadSource: string;
}
