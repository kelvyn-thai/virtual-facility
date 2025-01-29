import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ALARMS_CLASSIFIER_SERVICE, NOTIFICATION_SERVICE } from './constants';
import { AlarmsServiceController } from './alarms-service.controller';
import { AlarmsServiceService } from './alarms-service.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ALARMS_CLASSIFIER_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: process.env.NATS_URL,
          queue: 'alarms-classifier-queue',
        },
      },
      {
        name: NOTIFICATION_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672'],
          queue: 'notification-service-queue',
        },
      },
    ]),
  ],
  controllers: [AlarmsServiceController],
  providers: [AlarmsServiceService],
})
export class AlarmsServiceModule {}
