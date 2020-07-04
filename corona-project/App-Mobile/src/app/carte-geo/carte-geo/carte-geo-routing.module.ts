import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarteGeoPage } from './carte-geo.page';

const routes: Routes = [
  {
    path: '',
    component: CarteGeoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarteGeoPageRoutingModule {}
