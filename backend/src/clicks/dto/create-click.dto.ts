import {
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateClickDto {

  @IsNumber()
  productoId: number;

  @IsString()
  tipo: string;
}