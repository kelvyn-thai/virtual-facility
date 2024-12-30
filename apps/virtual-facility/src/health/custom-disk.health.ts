import { Injectable } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus';
import * as fs from 'fs/promises';

@Injectable()
export class CustomDiskHealthIndicator extends HealthIndicator {
  async checkDiskUsage(
    key: string,
    pathToCheck: string,
    warningThresholdPercent: number, // Warning threshold as a percentage (e.g., 60%)
    criticalThresholdPercent: number, // Critical threshold as a percentage (e.g., 80%)
  ): Promise<HealthIndicatorResult> {
    const { total, free } = await this.getDiskInfo(pathToCheck);
    const used = total - free;
    const usagePercent = (used / total) * 100;

    if (usagePercent >= criticalThresholdPercent) {
      throw new HealthCheckError(
        `${key} disk usage exceeded critical threshold`,
        this.getStatus(key, false, {
          usagePercent,
          criticalThresholdPercent,
        }),
      );
    }

    if (usagePercent >= warningThresholdPercent) {
      return this.getStatus(key, true, {
        status: 'warning',
        usagePercent,
        warningThresholdPercent,
      });
    }

    return this.getStatus(key, true, { usagePercent });
  }

  private async getDiskInfo(
    path: string,
  ): Promise<{ total: number; free: number }> {
    const stats = await fs.statfs(path);
    return {
      total: stats.blocks * stats.bsize, // Total size in bytes
      free: stats.bavail * stats.bsize, // Available size in bytes
    };
  }
}
