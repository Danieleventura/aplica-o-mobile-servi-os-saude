import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicalSpecialityPage } from './medical-speciality.page';

const routes: Routes = [
  {
    path: '',
    component: MedicalSpecialityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicalSpecialityPageRoutingModule {}
