import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { PartnerServiceModule } from './partner-service.module';

async function bootstrap() {
  const app = await NestFactory.create(PartnerServiceModule);
  const configService: ConfigService = app.get(ConfigService);
  const port: number = configService.get<number>('PARTNER_PORT');
  await app.listen(port);
  console.log('Partner Service Start At Port', port);
}
bootstrap();
