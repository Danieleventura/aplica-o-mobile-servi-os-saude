import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { IonicModule } from '@ionic/angular';
import {MedicalSpecialityPageRoutingModule } from './medical-speciality-routing.module';
import { MedicalSpecialityPage } from './medical-speciality.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicalSpecialityPageRoutingModule
  ],
  providers: [ Geolocation],
  declarations: [MedicalSpecialityPage]
})
export class EspecialidadePageModule {}
