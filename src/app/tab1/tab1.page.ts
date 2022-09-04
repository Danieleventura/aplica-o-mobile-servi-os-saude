/* eslint-disable max-len */
import { ModalController } from '@ionic/angular';
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-var */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { LoginPage } from '../login/LoginPage';
declare const google: any;
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  infiniteScrollLimit = 3;
  //google map variables
  @ViewChild('map1') mapRef: ElementRef;
  map: google.maps.Map;
  markers: any;
  myPosition: google.maps.LatLng;
  //directions(rotas) variables
  private direction = new google.maps.DirectionsService();
  private directionsRender = new google.maps.DirectionsRenderer();
  //json variables
  dataJson: any[];
  countData =0;
  constructor(private geolocation: Geolocation, private platform: Platform, public toastController: ToastController,
    private callNumber: CallNumber, private statusBar: StatusBar, private modalCtrl: ModalController) {}

  ngOnInit(): void {this.requestData();}

  requestData() {
    fetch('assets/data/data.json').then(res => res.json())
    .then(json => {
      this.dataJson = json;
      this.countData = this.dataJson.length;
    });
  }

  ionViewWillEnter(){
    this.platform.ready().then(( )=>{
      this.statusBar.backgroundColorByHexString('#4A90E4');
      this.initPage();
    });
  }

  async initPage(){
    await this.geolocation.getCurrentPosition().then((result) => {
      this.myPosition = new google.maps.LatLng(result.coords.latitude, result.coords.longitude);
      this.loadMap(result.coords.latitude, result.coords.longitude);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  async openModal(){
    const modal = await this. modalCtrl.create({
      component: LoginPage,
      componentProps: {nome: 'tab1'}
    });
    return await modal.present();
  }

  loadMap(lat, lng){
     const styles = {
      hide: [
        {
          featureType: 'transit',
          elementType: 'labels.icon',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'poi',
          elementType: 'labels.icon',
          stylers: [{ visibility: 'off' }],
        }
      ],
    };
    const latLng = new  google.maps.LatLng(lat, lng);
    const mapOption = {
      center: latLng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      keyboardShortcuts: false,
      fullscreenControl: false,
      styles: styles.hide
    };
    const element = document.getElementById('map1');
    this.map= new google.maps.Map(element, mapOption);
    const centerControlDiv = document.createElement('div');
    this.centerControl(centerControlDiv);
    const fullScreenControlDiv = document.createElement('div');
    this.fullScreenControl(fullScreenControlDiv);
    var image = {
      url: 'assets/img/marker-user.png',
      scaledSize: new google.maps.Size(70, 70)
    };
    const marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: 'Minha localização',
      icon: image,
      draggable:true,
      animation: google.maps.Animation.DROP
    });
    google.maps.event.addListener(marker, 'dragend', (event) =>{
      const latLngH = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()) ;
      this.myPosition = latLngH;
      if(this.directionsRender != null){
        this.directionsRender.setMap(null);
      };
    });
    this.loadHospitalsMap();
  }

  fullScreenControl(controlDiv: Element){
    const controlUI = document.createElement('div');
    controlDiv = document.createElement('div');
    controlUI.style.backgroundColor = '#4A90E4';
    controlUI.style.border = '5px solid #4A90E4';
    controlUI.style.borderRadius = '50px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginTop = '150px';
    controlUI.style.marginRight = '10px';
    controlUI.style.width = '50px';
    controlUI.style.height = '50px';
    controlUI.style.display = 'flex';
    controlUI.style.alignItems = 'center';
    controlUI.style.justifyContent = 'center';
    controlDiv.appendChild(controlUI);
    // Set CSS for the control interior.
    const controlIcon = document.createElement('img');
    controlIcon.src = '/assets/img/expandIcon.png';
    controlIcon.width = 30;
    controlIcon.height = 30;
    controlUI.appendChild(controlIcon);
    const elementToSendFullscreen = this.map.getDiv().firstChild as HTMLElement;
    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', () => {
      if (this.isFullscreen(elementToSendFullscreen)) {
        this.exitFullscreen();
        controlIcon.src = '/assets/img/expandIcon.png';
        controlIcon.width = 30;
        controlIcon.height = 30;
      } else {
        this.requestFullscreen(elementToSendFullscreen);
        controlIcon.src = '/assets/img/fullscreenIcon.png';
        controlIcon.width = 25;
        controlIcon.height = 25;
      }
    });
    this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlDiv);
  }

  isFullscreen(element: HTMLElement) {
    return (
      (document.fullscreenElement) === element
    );
  }

  requestFullscreen(element: HTMLElement) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    }
  }

  exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  centerControl(controlDiv: Element){
     const controlUI = document.createElement('div');
    controlDiv = document.createElement('div');
    controlUI.style.backgroundColor = '#4A90E4';
    controlUI.style.border = '5px solid #4A90E4';
    controlUI.style.borderRadius = '50px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginTop = '10px';
    controlUI.style.marginRight = '10px';
    controlUI.style.width = '50px';
    controlUI.style.height = '50px';
    controlUI.style.display = 'flex';
    controlUI.style.alignItems = 'center';
    controlUI.style.justifyContent = 'center';
    controlUI.title = 'Click to recenter the map';
    controlDiv.appendChild(controlUI);
    // Set CSS for the control interior.
    const controlIcon = document.createElement('ion-icon');
    controlIcon.name = 'locate-outline';
    controlIcon.style.fontSize = '30px';
    controlIcon.style.color = '#fff';
    controlUI.appendChild(controlIcon);
    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', () => {
      this.map.setCenter(this.myPosition);
    });
    this.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(controlDiv);
  }

  loadHospitalsMap(){
    this.markers = [];
    var image = {
      url: 'assets/img/marker-hospital.png',
      scaledSize: new google.maps.Size(40, 40)
    };
    for(const key of Object.keys(this.dataJson)){
      const latLngH = new google.maps.LatLng(this.dataJson[key].lat, this.dataJson[key].lng) ;
      const marker = new google.maps.Marker({
        position: latLngH,
        title: this.dataJson[key].name,
        map: this.map,
        icon: image
      });
      const contentString =
        '<div>' +
        '<h1 id="title-hospital">'+ this.dataJson[key].name + '</h1>' +
        '<div id="body-content-hospital">' +
        '<p>' + this.dataJson[key].address +  '</p>' +
        '</div>' +
        '</div>';
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });
    marker.addListener('click', () => {
      infowindow.open({
        anchor: marker,
        map: this.map,
        shouldFocus: false,
      });
    });
    }
  }

  infiniteScrollData(infiniteScrollEvent: any){
    this.infiniteScrollLimit +=2;
    infiniteScrollEvent.target.complete();
  }

  plotRouteMap(service){
    const latLngH = new google.maps.LatLng(service.lat, service.lng) ;
    const rota = google.maps.DirectionsRequest = {
        origin: this.myPosition,
        destination: latLngH,
        unitSystem: google.maps.UnitSystem.METRIC,
        travelMode: google.maps.TravelMode.DRIVING
      };
      this.direction.route(rota, (result, status) => {
        if(status==='OK'){
          this.directionsRender.setMap(this.map);
          this.directionsRender.setDirections(result);
          this.directionsRender.setOptions({suppressMarkers: true});
          console.log(result);
        }
      });
  }

  makeCall(numberPhone){
    this.callNumber.callNumber(numberPhone, true).then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  backToTop() {
    document.querySelector('ion-content').scrollToTop(400);
  }

  requestUber(service){
    const url = 'https://m.uber.com/ul/?action=setPickup&client_id=YOUR_KEY&pickup=my_location&dropoff[formatted_address]=' + service.name + '&dropoff[latitude]=' + service.lat + '&dropoff[longitude]=' + service.lng;
    window.open(url,'_system', 'location=yes');
  }

}

