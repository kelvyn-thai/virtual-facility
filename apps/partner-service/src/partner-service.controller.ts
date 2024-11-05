import { Controller, Get } from '@nestjs/common';
import { PartnerServiceService } from './partner-service.service';

@Controller()
export class PartnerServiceController {
  constructor(private readonly partnerServiceService: PartnerServiceService) {}

  @Get()
  getHello(): string {
    return this.partnerServiceService.getHello();
  }
}
