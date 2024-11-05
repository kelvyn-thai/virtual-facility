import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
  DiskHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { AxiosResponse, HttpStatusCode } from 'axios';
import commonConfigs from '../configs/common.configs';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly db: TypeOrmHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    @Inject(commonConfigs.KEY)
    private readonly commonConfig: ConfigType<typeof commonConfigs>,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('buildings-service', this.commonConfig.host),
    ]);
  }

  @Get('/buildings')
  @HealthCheck()
  async checkBuildings() {
    return this.health.check([
      () => this.http.pingCheck('buildings-service', this.commonConfig.host),
      () =>
        this.http.responseCheck(
          'buildings-service-status',
          `${this.commonConfig.host}/buildings`,
          (res: AxiosResponse<unknown>) => res.status === HttpStatusCode.Ok,
        ),
      () => this.db.pingCheck('database'),
      () =>
        this.disk.checkStorage('storage', { path: '/', thresholdPercent: 0.5 }),
      () => this.memory.checkHeap('memory_heap', 1 * 1024 * 1024),
      () => this.memory.checkRSS('memory_rss', 150 * 1024 * 1024),
    ]);
  }
}
