import { Controller, Get, Put, Param, NotFoundException, Body } from '@nestjs/common';
import { StoresService } from './stores.service';
import IStore from './interfaces/store.interface';
import UpdateStoreDto from './dto/update-store.dto';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

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
    const store = this.storesService.update(params.id, updateStoreDto);
    if (store) {
      return store
    } else {
      throw new NotFoundException();
    }
  }
}
