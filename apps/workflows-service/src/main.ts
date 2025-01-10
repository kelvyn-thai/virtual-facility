import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WorkflowsServiceModule } from './workflows-service.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(WorkflowsServiceModule);
  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice<MicroserviceOptions>(
    // {
    //   transport: Transport.NATS,
    //   options: {
    //     servers: process.env.NATS_URL,
    //     queue: 'workflows-service',
    //   },
    // },
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: 'workflows-service',
      },
    },
    {
      inheritAppConfig: true,
    },
  );

  await app.startAllMicroservices();

  await app.listen(3001);
}
bootstrap();
