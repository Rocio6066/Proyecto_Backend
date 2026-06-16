import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  // 🔐 VALIDACIONES (ya lo tenías)
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }),
);

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://mi-tienda-betina.web.app'
    ],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);

  console.log(
    `Servidor corriendo en http://localhost:${process.env.PORT ?? 3000}`,
  );
}

bootstrap();