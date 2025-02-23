import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseDto } from 'src/common/dto/base.dto';

export class RegisterDto extends BaseDto {
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
  @IsOptional()
  @IsNumber()
  createdby: number;
  @IsOptional()
  @IsNumber()
  updatedby: number
}
