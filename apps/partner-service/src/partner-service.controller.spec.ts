import { Test, TestingModule } from '@nestjs/testing';
import { PartnerServiceController } from './partner-service.controller';
import { PartnerServiceService } from './partner-service.service';

describe('PartnerServiceController', () => {
  let partnerServiceController: PartnerServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PartnerServiceController],
      providers: [PartnerServiceService],
    }).compile();

    partnerServiceController = app.get<PartnerServiceController>(PartnerServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(partnerServiceController.getHello()).toBe('Hello World!');
    });
  });
});
