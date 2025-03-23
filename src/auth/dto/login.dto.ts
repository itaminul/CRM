import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @IsOptional()
  @IsNumber()
  id: number;
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  roleName: string;
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
