import { NestFactory } from '@nestjs/core';
import { AlarmsServiceModule } from './alarms-service.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AlarmsServiceModule);
  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.NATS,
      options: {
        servers: process.env.NATS_URL,
        queue: 'alarms-service-queue',
      },
    },
    {
      inheritAppConfig: true,
    },
  );
  try {
    await app.startAllMicroservices();
  } catch (error) {
    console.debug({ error });
  }
  console.log('Started alarms service');
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
