import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingsModule } from './buildings/buildings.module';
import { ormConfig } from './ormconfig';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    BuildingsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        ...(ormConfig as any),
        retryAttempts: 5,
        retryDelay: 1000,
        autoLoadEntities: true,
      }),
    }),
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
