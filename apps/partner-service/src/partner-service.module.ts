import { Module } from '@nestjs/common';
import { PartnerServiceController } from './partner-service.controller';
import { PartnerServiceService } from './partner-service.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [PartnerServiceController],
  providers: [PartnerServiceService],
})
export class PartnerServiceModule {}
