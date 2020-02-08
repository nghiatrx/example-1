import { Controller, Get, Query } from '@nestjs/common';
import { DistrictsService } from './districts.service';
import IDistrict from './interfaces/district.interface';

@Controller('districts')
export class DistrictsController {
  constructor(private readonly storesService: DistrictsService) {}

  @Get()
  getByCityId(@Query() query: { cityId: string }): IDistrict[] {
    return this.storesService.getByCityId(query.cityId);
  }
}
