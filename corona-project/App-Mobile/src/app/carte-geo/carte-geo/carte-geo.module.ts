import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CarteGeoPageRoutingModule } from './carte-geo-routing.module';
import { CarteGeoPage } from './carte-geo.page';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarteGeoPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey:''
    })
  ],
  declarations: [CarteGeoPage]
})
export class CarteGeoPageModule {}