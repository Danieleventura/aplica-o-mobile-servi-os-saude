/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-var */
import { Component, OnInit} from '@angular/core';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  medicalSpeciality = [];
  constructor( private statusBar: StatusBar, private platform: Platform) {}
  ngOnInit(): void {this.dataToArray();}
  dataToArray() {
    fetch('assets/data/medicalSpeciality.json').then(res => res.json())
    .then(json => {
      this.medicalSpeciality = json;
    });
  }
  ionViewWillEnter(){
    this.platform.ready().then(( )=>{
      this.statusBar.backgroundColorByHexString('#4A90E4');
    });
  }
}

