import { Injectable } from '@nestjs/common';
import IStore from './interfaces/store.interface';
import UpdateStoreDto from './dto/update-store.dto';

@Injectable()
export class StoresService {
  private stores: IStore[] = [
    {
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
  ];

  findById(id: string): IStore | undefined {
    return this.stores.find(store => store.id === id);
  }

  update(id: string, data: UpdateStoreDto): IStore | null {
    let index = this.stores.findIndex(store => store.id === id);
    if (index > -1) {
      this.stores[index] = { ...this.stores[index], ...data }
      return this.stores[index]
    } else {
      return null;
    }
  }
}
