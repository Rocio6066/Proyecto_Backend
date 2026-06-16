import {
  Body,
  Controller,
  Post,
  Req,
} from '@nestjs/common';

import type { Request } from 'express';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LogoutDto } from './dto/logout.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  login(
    @Body() loginDto: LoginDto,
    @Req() request: Request,
  ) {

    const ip =
      request.ip ||
      request.socket.remoteAddress ||
      'Desconocida';

    const browser =
      request.headers['user-agent'] ||
      'Desconocido';

    return this.authService.login(
      loginDto,
      ip,
      browser,
    );
  }
  @Post('logout')
    logout(
    @Body() logoutDto: LogoutDto,
    @Req() request: Request,
    ) {

    const ip =
        request.ip ||
        request.socket.remoteAddress ||
        'Desconocida';

    const browser =
        request.headers['user-agent'] ||
        'Desconocido';

    return this.authService.logout(
        logoutDto,
        ip,
        browser,
    );
    }
}