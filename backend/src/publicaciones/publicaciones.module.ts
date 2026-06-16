import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Publicacion } from './entities/publicacion.entity';

import { PublicacionesController } from './publicaciones.controller';
import { PublicacionesService } from './publicaciones.service';

import { StorageModule } from '../storage/storage.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Publicacion]),
    StorageModule, 
  ],

  controllers: [PublicacionesController],
  providers: [PublicacionesService],
})
export class PublicacionesModule {}