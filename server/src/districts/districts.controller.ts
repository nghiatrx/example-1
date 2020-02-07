import { Controller, Get } from '@nestjs/common';
import { DistrictsService } from './districts.service';
import IDistrict from './interfaces/district.interface';

@Controller('districts')
export class DistrictsController {
  constructor(private readonly storesService: DistrictsService) {}

  @Get()
  findById(): IDistrict[] {
    return this.storesService.getAll();
  }
}
