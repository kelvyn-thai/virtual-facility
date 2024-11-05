import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { WorkflowsServiceModule } from './workflows-service.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(WorkflowsServiceModule);

  const configService = app.get(ConfigService);

  app.useGlobalFilters();

  app.useGlobalPipes(new ValidationPipe());

  const port: number = configService.get<number>('WORKFLOWS_PORT');

  await app.listen(port);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: 'nats://localhost:4222',
    },
  });

  await app.startAllMicroservices();

  console.debug('Workflows Service Start At Port: ', port);
}
bootstrap();
