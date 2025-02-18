import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  image: string;
  @IsOptional()
  @IsString()
  signature: string;
  @IsOptional()
  @IsString()
  address: string;
  @IsOptional()
  @IsString()
  phase_no: number;
  @IsOptional()
  @IsString()
  userRoleName: string;
}
