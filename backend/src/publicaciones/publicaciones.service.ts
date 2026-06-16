import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publicacion } from './entities/publicacion.entity';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class PublicacionesService {

  constructor(
    @InjectRepository(Publicacion)
    private readonly publicacionRepository: Repository<Publicacion>,

    private readonly storageService: StorageService,
  ) {}

  // ➕ CREATE
  async create(data: { productoId: number; imagenUrl: string }) {
    const publicacion = this.publicacionRepository.create(data);
    return await this.publicacionRepository.save(publicacion);
  }

  // 📦 GET ALL
  async findAll() {

    return await this.publicacionRepository.find({

      where: {
        activa: true,
      },

      relations: {
        producto: true,
      },

      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findAllAdmin() {

    return await this.publicacionRepository.find({
      relations: {
        producto: true,
      },

      order: {
        createdAt: 'DESC',
      },
    });
  }

  // 🔍 GET ONE
  async findOne(id: number) {
    const publicacion = await this.publicacionRepository.findOne({
      where: { id },
      relations: { producto: true },
    });

    if (!publicacion) {
      throw new NotFoundException('Publicación no encontrada');
    }

    return publicacion;
  }

  // 🗑️ DELETE
  async remove(id: number) {
    const publicacion = await this.publicacionRepository.findOne({
      where: { id },
    });

    if (!publicacion) {
      throw new NotFoundException('Publicación no encontrada');
    }

    const fileName = publicacion.imagenUrl?.split('/').pop();

    if (fileName) {
      try {
        await this.storageService.deleteImage(fileName);
      } catch (error) {
        console.log('Error eliminando imagen:', error);
      }
    }

    await this.publicacionRepository.remove(publicacion);

    return { message: 'Publicación eliminada correctamente' };
  }

  async darLike(id: number) {

    const publicacion =
      await this.publicacionRepository.findOne({
        where: { id },
      });

    if (!publicacion) {
      throw new NotFoundException(
        'Publicación no encontrada',
      );
    }

    publicacion.likes++;

    return await this.publicacionRepository.save(
      publicacion,
    );
  }

  async toggleActiva(id: number) {

    const publicacion =
      await this.publicacionRepository.findOne({
        where: { id },
      });

    if (!publicacion) {
      throw new NotFoundException(
        'Publicación no encontrada'
      );
    }

    publicacion.activa =
      !publicacion.activa;

    return await this.publicacionRepository.save(
      publicacion
    );
  }
}