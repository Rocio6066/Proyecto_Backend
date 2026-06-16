import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { UsuariosService } from '../usuarios/usuarios.service';
import { LogsService } from '../logs/logs.service';

import { LoginDto } from './dto/login.dto';
import { LogoutDto } from './dto/logout.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
    private readonly logsService: LogsService,
  ) {}

  async login(
    loginDto: LoginDto,
    ip: string,
    browser: string,
  ) {

    const usuario = await this.usuariosService.findByCorreo(
      loginDto.correo,
    );

    if (!usuario) {
      throw new UnauthorizedException(
        'Correo o contraseña incorrectos',
      );
    }
    if (!usuario.activo) {
      throw new UnauthorizedException(
        'Usuario desactivado'
      );
    }

    const passwordValido = await bcrypt.compare(
      loginDto.password,
      usuario.password,
    );

    if (!passwordValido) {
      throw new UnauthorizedException(
        'Correo o contraseña incorrectos',
      );
    }

    const payload = {
      sub: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
    };

    const token = this.jwtService.sign(payload);

    await this.logsService.registrar(
      usuario.id,
      usuario.nombre,
      ip,
      browser,
      'INGRESO',
    );

    return {
      access_token: token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    };
  }

  async logout(
    logoutDto: LogoutDto,
    ip: string,
    browser: string,
    ) {

    await this.logsService.registrar(
        logoutDto.usuarioId,
        logoutDto.usuario,
        ip,
        browser,
        'SALIDA',
    );

    return {
        mensaje: 'Sesión cerrada correctamente',
    };
    }
}