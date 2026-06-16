import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class LogoutDto {

  @IsNumber()
  usuarioId: number;

  @IsString()
  @IsNotEmpty()
  usuario: string;
}