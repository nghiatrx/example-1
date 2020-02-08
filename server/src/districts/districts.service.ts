import { Injectable } from '@nestjs/common';
import IDistrict from './interfaces/district.interface';

@Injectable()
export class DistrictsService {
  private readonly districts: IDistrict[] = [
    {
      id: 'District 1',
      text: 'District 1',
      cityId: 'HCMC'
    },
    {
      id: 'District 2',
      text: 'District 2',
      cityId: 'HCMC'
    },
    {
      id: 'District 3',
      text: 'District 3',
      cityId: 'HCMC'
    },
    {
      id: 'Thanh Xuan',
      text: 'Thanh Xuan',
      cityId: 'Ha noi'
    },
    {
      id: 'Ba Dinh',
      text: 'Ba Dinh',
      cityId: 'Ha noi'
    }
  ];

  getByCityId(cityId: string): IDistrict[] {
    return this.districts.filter(i => i.cityId === cityId); // this maybe is a database query
  }
}
