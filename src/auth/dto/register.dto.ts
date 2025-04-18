import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseDto } from 'src/common/dto/base.dto';

export class RegisterDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  username: string;
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
  userRoleName: string;
  @IsOptional()
  @IsNumber()
  createdby: number;
  @IsOptional()
  @IsNumber()
  updatedby: number;
  @IsOptional()
  @IsNumber()
  role_id: number;
  @IsNotEmpty()
  roleName: string; // Role should be provided as a string (e.g., "admin", "user")
  
}
