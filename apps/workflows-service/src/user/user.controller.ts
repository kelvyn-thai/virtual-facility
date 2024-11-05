import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  @EventPattern('user_created')
  async handleUserCreated(data: Record<string, unknown>) {
    //busniess logic
    console.log('user', data);
  }
}
