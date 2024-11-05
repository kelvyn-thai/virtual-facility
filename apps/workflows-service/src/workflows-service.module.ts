import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WorkflowsServiceController } from './workflows-service.controller';
import { WorkflowsServiceService } from './workflows-service.service';
import { WorkflowsModule } from './workflows/workflows.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './ormconfig';
import { MathModule } from './math/math.module';
import { UserModule } from './user/user.module';
import { WorkflowsController } from './workflows/workflows.controller';

@Module({
  imports: [
    WorkflowsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...(ormConfig as any),
        retryAttempts: 5,
        retryDelay: 1000,
        autoLoadEntities: true,
      }),
    }),
    MathModule,
    UserModule,
  ],
  controllers: [],
  providers: [WorkflowsServiceService],
})
export class WorkflowsServiceModule {}
