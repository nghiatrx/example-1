import { Test, TestingModule } from '@nestjs/testing';
import { StoresController } from './stores.controller';
import { DistrictsModule } from '../districts/districts.module';
import { CitiesModule } from '../cities/cities.module';
import { StoresService } from './stores.service';

describe('Stores Controller', () => {
  let controller: StoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoresController],
      imports: [DistrictsModule, CitiesModule],
      providers: [StoresService],
    }).compile();

    controller = module.get<StoresController>(StoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
