import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);

  const port: number = configService.get<number>('BUILDINGS_PORT');

  app.useGlobalFilters();

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);

  console.debug('Buildings Service Start At Port: ', port);
}

bootstrap();
