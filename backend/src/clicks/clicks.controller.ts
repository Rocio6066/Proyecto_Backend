import {
  Controller,
  Get,
  Post,
  Body,
  Query,
} from '@nestjs/common';

import { ClicksService } from './clicks.service';

import { CreateClickDto } from './dto/create-click.dto';

@Controller('clicks')
export class ClicksController {

  constructor(
    private readonly clicksService: ClicksService,
  ) {}

  @Post()
  create(
    @Body()
    createClickDto: CreateClickDto,
  ) {
    return this.clicksService.create(
      createClickDto,
    );
  }

  @Get()
  findAll() {
    return this.clicksService.findAll();
  }

  @Get('estadisticas')
  estadisticas(
    @Query('mes') mes?: string,
  ) {
    return this.clicksService.estadisticas(
      Number(mes),
    );
  }
  
  @Get('top-dia')
  topDia() {
    return this.clicksService.topDia();
  }

  @Get('top-mes')
  topMes() {
    return this.clicksService.topMes();
  }

  @Get('top-anio')
  topAnio() {
    return this.clicksService.topAnio();
  }

}