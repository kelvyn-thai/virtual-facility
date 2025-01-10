import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Interval } from '@nestjs/schedule';
import { ALARMS_SERVICE } from './constant';

@Injectable()
export class AlarmsGeneratorService {
  constructor(
    @Inject(ALARMS_SERVICE)
    private readonly alarmsService: ClientProxy,
  ) {}

  private readonly logger = new Logger(AlarmsGeneratorService.name);

  @Interval(10000 * 1)
  generateAlarm() {
    const alarmCreatedEvent = {
      name: `Alarm # ${Math.floor(Math.random() * 1000) + 1}`,
      buildingId: Math.floor(Math.random() * 100) + 1,
    };
    this.logger.debug(
      `Alarm created with data: ${JSON.stringify(alarmCreatedEvent)}`,
    );

    this.alarmsService.emit('alarm.created', alarmCreatedEvent);
  }
}
