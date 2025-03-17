import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class LoginDto {
  @IsOptional()
  @IsNumber()
  id: number
  @IsOptional()
  @IsString()
  name: string
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
