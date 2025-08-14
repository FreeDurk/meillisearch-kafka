import { Test, TestingModule } from '@nestjs/testing';
import { MeiliIndexingController } from './meili_indexing.controller';
import { MeiliIndexingService } from './meili_indexing.service';

describe('MeiliIndexingController', () => {
  let meiliIndexingController: MeiliIndexingController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MeiliIndexingController],
      providers: [MeiliIndexingService],
    }).compile();

    meiliIndexingController = app.get<MeiliIndexingController>(MeiliIndexingController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(meiliIndexingController.getHello()).toBe('Hello World!');
    });
  });
});
