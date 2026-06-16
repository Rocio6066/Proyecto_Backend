import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Patch,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

import { PublicacionesService } from './publicaciones.service';
import { StorageService } from '../storage/storage.service';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';

@Controller('publicaciones')
export class PublicacionesController {
  constructor(
    private readonly publicacionesService: PublicacionesService,
    private readonly storageService: StorageService,
  ) {}

  // ➕ CREATE
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
    }),
  )
  async create(
    @Body() dto: CreatePublicacionDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No se recibió imagen');
    }

    const imageUrl = await this.storageService.uploadImage(file);

    return this.publicacionesService.create({
      productoId: Number(dto.productoId),
      imagenUrl: imageUrl,
    });
  }

 @Get('admin')
  findAllAdmin() {
    return this.publicacionesService.findAllAdmin();
  }

  @Get()
  findAll() {
    return this.publicacionesService.findAll();
  }
  
  @Patch(':id/like')
  darLike(
    @Param('id') id: string,
  ) {
    return this.publicacionesService.darLike(
      Number(id),
    );
  }
  // 🗑️ ELIMINAR
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicacionesService.remove(Number(id));
  }

  @Patch(':id/toggle')
  toggle(
    @Param('id') id: string,
  ) {
    return this.publicacionesService.toggleActiva(
      Number(id),
    );
  }
}