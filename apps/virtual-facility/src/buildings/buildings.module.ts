import { Module } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { BuildingsController } from './buildings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Building } from './entities/building.entity';
import {
  ClientProxyFactory,
  Transport,
  Serializer,
  Deserializer,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

class CustomSerializer implements Serializer {
  serialize(value: any, options?: Record<string, any>) {
    console.log(
      'OK. I will log info before send it to workflow service',
      value,
    );
    return {
      ...value,
      additionalInfo: { from: 'buildings-service', to: 'workflows-service' },
    };
  }
}

class CustomDeserializer implements Deserializer {
  deserialize(value: any, options?: Record<string, any>) {
    console.log('deserialize data', value);
    return value;
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Building])],
  controllers: [BuildingsController],
  providers: [
    BuildingsService,
    {
      provide: 'workflows-service',
      useFactory: (configService: ConfigService) => {
        // can use configService to get config from env
        return ClientProxyFactory.create({
          transport: Transport.NATS,
          options: {
            servers: 'nats://localhost:4222',
            // serializer: new CustomSerializer(),
            // deserializer: new CustomDeserializer(),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class BuildingsModule {}
