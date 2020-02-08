import { Test } from '@nestjs/testing';
import { StoresController } from '../src/stores/stores.controller';
import { DistrictsModule } from '../src/districts/districts.module';
import { CitiesModule } from '../src/cities/cities.module';
import { StoresService } from '../src/stores/stores.service';
import { INestApplication } from '@nestjs/common';
import IStore from '../src/stores/interfaces/store.interface';
import * as request from 'supertest';
import UpdateStoreDto from '../src/stores/dto/update-store.dto';

describe('Stores Controller', () => {
  const data = {
    id: 'id1',
    logoUrl: '',
    name: 'K.O.I The',
    address: '',
    district: '',
    city: '',
    phone: '84399874802',
    redInvoice: {
      name: 'K.O.I The International Company',
      address: '',
      district: '',
      city: '',
      taxCode: 'P123456789',
    }
  }
  let app: INestApplication;
  let storesService = {
    findById: (id: string): IStore => data,
    update: (id: string, data: UpdateStoreDto) => data
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [StoresController],
      imports: [DistrictsModule, CitiesModule],
      providers: [StoresService],
    })
      .overrideProvider(StoresService)
      .useValue(storesService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it(`/GET stores/id1`, () => {
    return request(app.getHttpServer())
      .get('/stores/id1')
      .expect(200)
      .expect(storesService.findById('id1'))
  });

  it(`/PUT stores/id1`, () => {
    return request(app.getHttpServer())
      .put('/stores/id1')
      .set(data)
      .expect(200)
  });

});
