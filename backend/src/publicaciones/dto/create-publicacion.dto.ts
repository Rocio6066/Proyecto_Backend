import { IsNumber } from 'class-validator';

export class CreatePublicacionDto {

  @IsNumber()
  productoId: number;
}