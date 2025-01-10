import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AlarmsClassifierServiceController {
  private readonly logger = new Logger();

  @MessagePattern('alarm.classify')
  classifyAlarm(@Payload() data: unknown) {
    this.logger.debug(
      `Received new "alarm.classify" message: ${JSON.stringify(data)} `,
    );

    return {
      category: ['critical', 'non-critital', 'invalid'][
        Math.floor(Math.random() * 3)
      ],
    };
  }
}
