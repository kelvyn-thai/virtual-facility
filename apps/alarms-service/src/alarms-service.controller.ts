import { Controller, Inject, Logger } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { ALARMS_CLASSIFIER_SERVICE, NOTIFICATION_SERVICE } from './constants';
import { lastValueFrom } from 'rxjs';

@Controller()
export class AlarmsServiceController {
  private readonly logger = new Logger(AlarmsServiceController.name);

  constructor(
    @Inject(ALARMS_CLASSIFIER_SERVICE)
    private readonly alarmsClassifierService: ClientProxy,
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: ClientProxy,
  ) {}

  @EventPattern('alarm.created')
  async create(@Payload() data: { name: string; buildingId: number }) {
    this.logger.debug(
      `Received new "alarm.created" event: ${JSON.stringify(data)}`,
    );

    const alarmClassification = await lastValueFrom<{ category: string }>(
      this.alarmsClassifierService.send('alarm.classify', data),
    );

    this.logger.debug(
      `Alarm "${data.name} classified as ${alarmClassification.category}`,
    );

    const notify$ = this.notificationService.emit('notification.send', {
      alarm: data,
      category: alarmClassification.category,
    });
    await lastValueFrom(notify$);
    this.logger.debug(`Dispatched "notification.send" event`);
  }
}
