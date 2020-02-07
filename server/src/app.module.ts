import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoresModule } from './stores/stores.module';
import { DistrictsModule } from './districts/districts.module';
import { CitiesModule } from './cities/cities.module';
import { FilesController } from './files/files.controller';

@Module({
  controllers: [AppController, FilesController],
  providers: [AppService],
  imports: [
    StoresModule, DistrictsModule, CitiesModule
  ],
})
export class AppModule { }
