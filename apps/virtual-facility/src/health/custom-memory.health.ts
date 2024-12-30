import { Injectable } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus';

@Injectable()
export class CustomMemoryHealthIndicator extends HealthIndicator {
  checkMemoryUsage(
    key: string,
    type: 'rss' | 'heap',
    warningThreshold: number, // Warning threshold in bytes
    criticalThreshold: number, // Critical threshold in bytes
  ): HealthIndicatorResult {
    const memoryUsage = process.memoryUsage();
    const currentUsage =
      (type === 'rss' ? memoryUsage.rss : memoryUsage.heapUsed) / 1024 / 1024;

    if (currentUsage > criticalThreshold) {
      throw new HealthCheckError(
        `${key} memory usage exceeded critical threshold`,
        this.getStatus(key, false, {
          thresholdBytes: criticalThreshold,
          usageBytes: currentUsage,
        }),
      );
    }

    if (currentUsage > warningThreshold) {
      return this.getStatus(key, true, {
        thresholdBytes: warningThreshold,
        usageBytes: currentUsage,
        status: 'warning',
      });
    }

    return this.getStatus(key, true, { usageBytes: currentUsage });
  }
}
