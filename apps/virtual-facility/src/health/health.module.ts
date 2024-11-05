import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import commonConfigs from '../configs/common.configs';

@Module({
  imports: [
    TerminusModule.forRoot({
      errorLogStyle: 'pretty',
    }),
    HttpModule,
    ConfigModule.forFeature(commonConfigs),
  ],
  controllers: [HealthController],
})
export class HealthModule {}
