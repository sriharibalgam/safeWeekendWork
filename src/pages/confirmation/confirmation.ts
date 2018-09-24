import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html',
})
export class Confirmation implements OnInit {

  constructor(public navCtrl: NavController, public navParams: NavParams ) {
  }
  ngOnInit() {
    setTimeout(() => { this.goToOtherPage(); }, 2000);
  }
  goToOtherPage() {
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Home');
  }
 
}
