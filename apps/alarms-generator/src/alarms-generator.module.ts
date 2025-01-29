import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AlarmsGeneratorService } from './alarms-generator.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ALARMS_SERVICE } from './constant';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ClientsModule.register([
      {
        name: ALARMS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: process.env.NATS_URL,
          queue: 'alarms-service-queue',
        },
      },
    ]),
  ],
  controllers: [],
  providers: [AlarmsGeneratorService],
})
export class AlarmsGeneratorModule {}
