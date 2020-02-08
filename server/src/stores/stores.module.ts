import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { DistrictsModule } from 'src/districts/districts.module';
import { CitiesModule } from 'src/cities/cities.module';

@Module({
  providers: [StoresService],
  controllers: [StoresController],
  imports: [DistrictsModule, CitiesModule]
})
export class StoresModule {}
