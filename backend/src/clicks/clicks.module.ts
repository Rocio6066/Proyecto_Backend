import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Click } from './entities/click.entity';
import { Producto } from '../productos/entities/producto.entity';

import { ClicksController } from './clicks.controller';
import { ClicksService } from './clicks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Click,
      Producto,
    ]),
  ],

  controllers: [ClicksController],

  providers: [ClicksService],

  exports: [ClicksService],
})
export class ClicksModule {}