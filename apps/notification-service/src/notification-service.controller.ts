import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class NotificationServiceController {
  private readonly logger = new Logger(NotificationServiceController.name);

  @EventPattern('notification.send')
  sendNotification(@Payload() data: unknown, @Ctx() context: RmqContext) {
    this.logger.debug(
      `Sending notification about the alarm: ${JSON.stringify(data)}`,
    );
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    this.logger.log({ fields: originalMsg.fields });
    // Check if message was already redelivered to avoid entering an infinite loop.
    if (originalMsg.fields.redelivered) {
      // If so, acknowledge the message and discard it.
      this.logger.verbose(
        `Message was already redelivered. Acknowledging the message and discarding it.`,
      );
      return channel.ack(originalMsg);
    }
    // Otherwise, reject the message and requeue it - just for the sake of this demo.
    channel.nack(originalMsg);
  }
}
