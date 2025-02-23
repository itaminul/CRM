import { IsOptional, IsNumber, Min } from "class-validator"
import { Type } from "class-transformer"

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page?: number = 1

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  limit?: number = 10
}

export class BaseResponseDto {
  id: number
  createdAt: Date
  updatedAt: Date
}

