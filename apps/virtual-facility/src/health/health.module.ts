import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { DogHealthIndicator } from './dog.health';
import { CustomDiskHealthIndicator } from './custom-disk.health';
import { CustomMemoryHealthIndicator } from './custom-memory.health';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthController],
  providers: [
    DogHealthIndicator,
    CustomDiskHealthIndicator,
    CustomMemoryHealthIndicator,
  ],
})
export class HealthModule {}
