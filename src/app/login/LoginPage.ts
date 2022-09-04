import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { NavParams, Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private navParams: NavParams, private statusBar: StatusBar, private platform: Platform) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#4A90E4');
    });
  }

}
