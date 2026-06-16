import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { Usuario } from './entities/usuario.entity';

import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {

    const existeCorreo = await this.usuarioRepository.findOne({
      where: {
        correo: createUsuarioDto.correo,
      },
    });

    if (existeCorreo) {
      throw new BadRequestException(
        'El correo ya está registrado',
      );
    }

    const passwordHash = await bcrypt.hash(
      createUsuarioDto.password,
      10,
    );

    const usuario = this.usuarioRepository.create({
      nombre: createUsuarioDto.nombre,
      correo: createUsuarioDto.correo,
      password: passwordHash,
      rol: 'ADMIN',
    });

    return await this.usuarioRepository.save(usuario);
  }

  async findAll() {
    return await this.usuarioRepository.find();
  }

  async findByCorreo(correo: string) {

    return await this.usuarioRepository.findOne({
        where: {
        correo,
        },
    });

  }
  async cambiarEstado(id: number) {

    const usuario =
      await this.usuarioRepository.findOne({
        where: { id },
      });

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    usuario.activo = !usuario.activo;

    return await this.usuarioRepository.save(
      usuario,
    );
  }
}