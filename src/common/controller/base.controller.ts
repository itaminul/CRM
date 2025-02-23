import { Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, HttpCode, ParseIntPipe } from "@nestjs/common"
import type { BaseService } from "../services/base.service"
import type { PaginationDto } from "../dto/base.dto"
import { IBaseEntity } from "../interface/base.interface";

export class BaseController<T extends IBaseEntity> {
  constructor(private readonly baseService: BaseService<T>) {}

//   @Post()
//   @HttpCode(HttpStatus.CREATED)
//   create(@Body() createDto: any) {
//     return this.baseService.create(createDto);
//   }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.baseService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.baseService.findOne(id);
  }

//   @Patch(":id")
//   update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: any) {
//     return this.baseService.update(id, updateDto)
//   }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.baseService.remove(id);
  }
}

