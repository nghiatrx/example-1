import { Injectable } from '@nestjs/common';
import IDistrict from './interfaces/district.interface';

@Injectable()
export class DistrictsService {
  private readonly districts: IDistrict[] = [
    {
      id: 'District 1',
      text: 'District 1'
    },
    {
      id: 'District 2',
      text: 'District 2'
    },
    {
      id: 'District 3',
      text: 'District 3'
    },
    {
      id: 'District 4',
      text: 'District 4'
    }
  ];

  getAll() {
    return this.districts;
  }
}
