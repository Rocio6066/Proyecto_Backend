import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ProductosModule } from './productos/productos.module';
import { PublicacionesModule } from './publicaciones/publicaciones.module';
import { LogsModule } from './logs/logs.module';
import { ClicksModule } from './clicks/clicks.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',

        host: config.get<string>('DB_HOST'),
        port: Number(config.get<number>('DB_PORT')),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),

        autoLoadEntities: true,
        synchronize: true,

        ssl: false, // 👈 IMPORTANTE (forzado simple para que Kubernetes funcione)
      }),
    }),

    StorageModule,
    AuthModule,
    UsuariosModule,
    ProductosModule,
    PublicacionesModule,
    LogsModule,
    ClicksModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}