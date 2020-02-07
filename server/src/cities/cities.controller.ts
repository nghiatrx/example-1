import { Controller, Get } from '@nestjs/common';
import { CitiesService } from './cities.service';
import ICity from './interfaces/city.interface';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  findById(): ICity[] {
    return this.citiesService.getAll();
  }

}
