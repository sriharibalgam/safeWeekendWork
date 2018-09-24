import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';
import { Confirmation } from '../confirmation/confirmation';
import { GoogleMapsPage } from '../google-maps/google-maps.page';
import { MapsService } from '../../services/maps.service';

@IonicPage()
@Component({
  selector: 'page-request',
  templateUrl: 'request.html',
})
export class RequestPage {
  userData: string;
  requstFlag: boolean = true;
  emergencyFlag: boolean;
  viewRequstFlag: boolean;
  reqList: any;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public http: Http, public navParams: NavParams,
    private geolocation: Geolocation,
    private mapsService: MapsService, ) {
    this.userData = this.navParams.get("userData");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestPage');
  }
  navigateToRequst() {
    this.requstFlag = true;
    this.emergencyFlag = false;
    this.viewRequstFlag = false;
  }
  navigateToEmergency() {
    var officeLocation = '17.446241, 78.635655';
    this.mapsService.openMapsApp(officeLocation);
    this.requstFlag = false;
    this.emergencyFlag = true;
    this.viewRequstFlag = false;
    let alert = this.alertCtrl.create({
      title: 'Are You In Trouble',
      message: '',
      buttons: [
        {
          text: 'Yes',
          role: 'Yes',
          handler: () => {
            this.geolocation.getCurrentPosition().then((resp) => {
              console.log('lng ', resp.coords.longitude, 'lat ', resp.coords.latitude);

              let mapUrliOS: string = 'maps://maps.apple.com/?q=';
              let destination = resp.coords.latitude + "," + resp.coords.longitude;
              mapUrliOS = mapUrliOS + destination;
              window.open(mapUrliOS, '_system');
            });
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
          }
        }
      ]
    });
    alert.present();

  }

  public getOfficeLocation() {
    var officeLocation = '17.446241, 78.635655';
    this.mapsService.openMapsApp(officeLocation);
  }



  navigateToViewRequst() {
    this.requstFlag = false;
    this.emergencyFlag = false;
    this.viewRequstFlag = true;
    this.http.get('assets/localJsons/placedRequsts.json').map(res => res.json()).subscribe(data => {
      console.log(data.RequstList);
      this.reqList = data.RequstList;
    });
  }

  getWeekendRequests() {
    this.http.get('http://localhost:8000/getWeekendRequests').map(res => res.json()).subscribe(data => {
      console.log(data.data);
      var workRequests = data.RequstList;
    });
  }

  saveWeekendRequest() {
    var reqData = {
        "firstName": "Vennela",
        "lastName": "M",
        "emp_id": "789654",
        "cubical_info": "HYD02 B4 05 b 042",
        "approved_by": "789654",
        "contact": "8801118436"
      };
    this.http.post('http://localhost:8000/saveWeekendRequest', reqData)
      .map(res => res.json())
      .subscribe(data => { })

  }
  confirmationClick() {
    this.navCtrl.push(Confirmation);
  }
}
