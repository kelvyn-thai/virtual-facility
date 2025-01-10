import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron('5 * * * * *')
  handleCron() {
    this.logger.debug('Called when the current second is 5');
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  handleCronEach30Seconds() {
    this.logger.debug('Called every 30 seconds');
  }
}
