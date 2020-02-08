import { Controller, Get, Put, Param, NotFoundException, Body, BadRequestException } from '@nestjs/common';
import { StoresService } from './stores.service';
import IStore from './interfaces/store.interface';
import UpdateStoreDto from './dto/update-store.dto';
import { DistrictsService } from '../districts/districts.service';
import { CitiesService } from '../cities/cities.service';

@Controller('stores')
export class StoresController {
  constructor(
    private readonly storesService: StoresService,
    private readonly districtsService: DistrictsService,
    private readonly citiesService: CitiesService
  ) {}

  @Get(':id')
  findById(@Param() params): IStore | undefined {
    const store = this.storesService.findById(params.id);
    if (store) {
      return store;
    } else {
      throw new NotFoundException();
    }
  }

  @Put(':id')
  update(@Param() params, @Body() updateStoreDto: UpdateStoreDto): IStore {
    // validate district and city
    if (updateStoreDto.city) {
      const city = this.citiesService.getAll().find(city => city.id === updateStoreDto.city);
      if (!city) {
        throw new BadRequestException('City is invalid');
      } else {
        const districts = this.districtsService.getByCityId(city.id);
        if (!districts.find(district => district.id === updateStoreDto.district)) {
          throw new BadRequestException('District is invalid');
        }
      }
    }

    if (updateStoreDto.redInvoice?.city) {
      const city = this.citiesService.getAll().find(city => city.id === updateStoreDto.redInvoice.city);
      if (!city) {
        throw new BadRequestException(`City's RedInvoice is invalid`);
      } else {
        const districts = this.districtsService.getByCityId(city.id);
        if (!districts.find(district => district.id === updateStoreDto.redInvoice.district)) {
          throw new BadRequestException(`City's RedInvoice is invalid`);
        }
      }
    }

    // check phone number
    if (updateStoreDto.phone) {
      const regex = /^([0-9]){9,11}$/;
      if (updateStoreDto.phone.match(regex) === null) {
        throw new BadRequestException(`Phone is invalid`);
      }
    }

    const store = this.storesService.update(params.id, updateStoreDto);
    if (store) {
      return store
    } else {
      throw new NotFoundException();
    }
  }
}
