import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import {
  Repository,
  Between,
} from 'typeorm';

import { Click } from './entities/click.entity';

import { CreateClickDto } from './dto/create-click.dto';

import { Producto } from '../productos/entities/producto.entity';


@Injectable()
export class ClicksService {

  constructor(
  @InjectRepository(Click)
  private readonly clickRepository: Repository<Click>,

  @InjectRepository(Producto)
  private readonly productoRepository:
    Repository<Producto>,
) {}

  async create(
    createClickDto: CreateClickDto,
  ) {

    const click =
      this.clickRepository.create(
        createClickDto,
      );

    return await this.clickRepository.save(
      click,
    );
  }

  async findAll() {

    return await this.clickRepository.find({
      order: {
        fecha: 'DESC',
      },
    });
  }

  async topDia() {

  const inicio = new Date();
  inicio.setHours(0, 0, 0, 0);

  const fin = new Date();
  fin.setHours(23, 59, 59, 999);

  const clicks = await this.clickRepository.find({
    where: {
      fecha: Between(inicio, fin),
    },
  });

  return this.agruparClicks(clicks);
}

async topMes() {

  const hoy = new Date();

  const inicio = new Date(
    hoy.getFullYear(),
    hoy.getMonth(),
    1,
  );

  const fin = new Date(
    hoy.getFullYear(),
    hoy.getMonth() + 1,
    0,
    23,
    59,
    59,
    999,
  );

  const clicks = await this.clickRepository.find({
    where: {
      fecha: Between(inicio, fin),
    },
  });

  return this.agruparClicks(clicks);
}

async topAnio() {

  const hoy = new Date();

  const inicio = new Date(
    hoy.getFullYear(),
    0,
    1,
  );

  const fin = new Date(
    hoy.getFullYear(),
    11,
    31,
    23,
    59,
    59,
    999,
  );

  const clicks = await this.clickRepository.find({
    where: {
      fecha: Between(inicio, fin),
    },
  });

  return this.agruparClicks(clicks);
}

async estadisticas(
  mes?: number,
) {

  const clicks =
    await this.clickRepository.find({
      relations: {
        producto: true,
      },
    });

  const resultado: any = {};

  clicks.forEach((click) => {

    // Filtrar por mes
    if (mes && !isNaN(mes)) {

      const fecha =
        new Date(click.fecha);

      if (
        fecha.getMonth() + 1 !== mes
      ) {
        return;
      }
    }

    const id = click.productoId;

    if (!resultado[id]) {

      resultado[id] = {
        productoId: id,
        nombre:
          click.producto?.nombre ||
          'Producto',
        likes: 0,
        detalles: 0,
      };
    }

    if (click.tipo === 'LIKE') {
      resultado[id].likes++;
    }

    if (click.tipo === 'DETALLE') {
      resultado[id].detalles++;
    }

  });

  return Object.values(resultado)
    .sort(
      (a: any, b: any) =>
        (b.likes + b.detalles) -
        (a.likes + a.detalles),
    );
}

private agruparClicks(clicks: Click[]) {

  const contador = {};

  clicks.forEach((click) => {

    contador[click.productoId] =
      (contador[click.productoId] || 0) + 1;
  });

  return Object.entries(contador)
    .map(([productoId, total]) => ({
      productoId: Number(productoId),
      totalClicks: total,
    }))
    .sort(
      (a, b) =>
        Number(b.totalClicks) -
        Number(a.totalClicks),
    );
}
}