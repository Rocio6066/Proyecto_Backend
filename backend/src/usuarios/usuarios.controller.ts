import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
} from '@nestjs/common';

import { UsuariosService } from './usuarios.service';

import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../auth/decorators/roles.decorator';

  @Controller('usuarios')
  export class UsuariosController {

    constructor(
      private readonly usuariosService: UsuariosService,
    ) {}

    @Post()

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles('JEFE')

  create(
    @Body() createUsuarioDto: CreateUsuarioDto,
  ) {
    return this.usuariosService.create(
      createUsuarioDto,
    );
  }

  @Get()

    @UseGuards(
    JwtAuthGuard,
    RolesGuard,
    )

    @Roles('JEFE')

    findAll() {
    return this.usuariosService.findAll();
    }

    @Patch(':id/estado')

    @UseGuards(
      JwtAuthGuard,
      RolesGuard,
    )

    @Roles('JEFE')

    cambiarEstado(
      @Param('id') id: number,
    ) {
      return this.usuariosService.cambiarEstado(
        Number(id),
      );
    }
}