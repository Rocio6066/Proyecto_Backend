import {
  IsNotEmpty,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateProductoDto {

  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  @Min(0)
  precio: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsNotEmpty()
  detalle: string;
}