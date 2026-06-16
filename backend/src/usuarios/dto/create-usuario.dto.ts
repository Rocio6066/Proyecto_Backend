import {
  IsEmail,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class CreateUsuarioDto {

  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  correo: string;

  @MinLength(8)
  password: string;
}