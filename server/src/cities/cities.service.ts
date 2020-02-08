import { Injectable } from '@nestjs/common';
import ICity from './interfaces/city.interface';

@Injectable()
export class CitiesService {
  private readonly cities: ICity[] = [
    {
      id: 'HCMC',
      text: 'HCMC'
    },
    {
      id: 'Ha noi',
      text: 'Ha noi'
    }
  ];

  getAll() {
    return this.cities;
  }
}
