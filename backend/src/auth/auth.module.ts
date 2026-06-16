import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { UsuariosModule } from '../usuarios/usuarios.module';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './strategies/jwt.strategy';
import { LogsModule } from '../logs/logs.module';

@Module({
  imports: [
    UsuariosModule,
    PassportModule,
    LogsModule,

    JwtModule.register({
      secret: process.env.JWT_SECRET || 'tiendaropa2026',
      signOptions: {
        expiresIn: '8h',
      },
    }),
  ],

  controllers: [AuthController],

  providers: [
    AuthService,
    JwtStrategy,
  ],
})

export class AuthModule {}