import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { ProductosService } from './productos.service';

import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Controller('productos')
export class ProductosController {

  constructor(
    private readonly productosService: ProductosService,
  ) {}

  // CREAR
  @Post()
  create(
    @Body() createProductoDto: CreateProductoDto,
  ) {
    return this.productosService.create(
      createProductoDto,
    );
  }

  // LISTAR
  @Get()
  findAll() {
    return this.productosService.findAll();
  }

  // BUSCAR UNO
  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.productosService.findOne(
      Number(id),
    );
  }

  // EDITAR
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductoDto: UpdateProductoDto,
  ) {
    return this.productosService.update(
      Number(id),
      updateProductoDto,
    );
  }

  // ELIMINAR
  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.productosService.remove(
      Number(id),
    );
  }
}