import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { CustomDiskHealthIndicator } from './custom-disk.health';
import { CustomMemoryHealthIndicator } from './custom-memory.health';
import { DogHealthIndicator } from './dog.health';

@Controller('health')
export class HealthController {
  private readonly key = `virtual-facility`;

  constructor(
    private readonly health: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
    private readonly http: HttpHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    private dogHealthIndicator: DogHealthIndicator,
    private readonly customDiskIndicator: CustomDiskHealthIndicator,
    private readonly customMemoryIndicator: CustomMemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    const key: string = this.key;
    console.debug({
      ...this.checkHeapMemory(),
    });
    return this.health.check([
      () => this.http.pingCheck(`http-${key}`, 'http://localhost:3000'),
      () => this.db.pingCheck(`database`),
      () =>
        this.customDiskIndicator.checkDiskUsage(
          `disk-${this.key}`,
          '/',
          60,
          80,
        ), // 60% warning, 80% critical
      () =>
        this.customMemoryIndicator.checkMemoryUsage(
          'memory_rss',
          'rss',
          60,
          80,
        ), // 60% warning, 80% critical
      () =>
        this.customMemoryIndicator.checkMemoryUsage(
          'memory_heap',
          'heap',
          60,
          80,
        ), // 60% warning, 80% critical      () => this.dogHealthIndicator.isHealthy('dog'),
    ]);
  }

  checkHeapMemory() {
    const used = process.memoryUsage();
    return {
      heapUsed: (used.heapUsed / 1024 / 1024).toFixed(2) + ' MB',
      heapTotal: (used.heapTotal / 1024 / 1024).toFixed(2) + ' MB',
    };
  }
}
