import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RequestPage } from '../request/request';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    username: string = "";
    passWord: string = "";
    constructor(public navCtrl: NavController,
        public http: Http,
        public alertCtrl: AlertController) {

    }
    navigateTo() {
        console.log("clicked to");
        console.log(this.username);
        console.log(this.passWord);
        if (this.username == '') {
            const alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'username required',
                buttons: ['OK']
            });
            alert.present();
        } else if (this.passWord == '') {
            const alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'password required',
                buttons: ['OK']
            });
            alert.present();
        }
        else if (this.username != '' && this.passWord != '') {
            this.http.post('http://localhost:8000/login', {username: this.username, password: this.passWord})
                .map(res => res.json())
                .subscribe(data => {
                    console.log(data);
                    let empList = data.data;
                    let flag: boolean = false;
                    let empData: any;
                    
                    if (empList.username == this.username && empList.password == this.passWord) {
                        flag = true;
                        empData = empList;
                    }
                    
                    if (flag) {
                        localStorage.setItem('userData', JSON.stringify(empData));
                        this.navCtrl.push(RequestPage, { 'userData': empData });
                    } else {
                        const alert = this.alertCtrl.create({
                            title: 'Error',
                            subTitle: 'Authentication failed',
                            buttons: ['OK']
                        });
                        alert.present();
                    }
                });

            /*
            this.http.get('assets/localJsons/employeeData.json').map(res => res.json()).subscribe(data => {
              //this.http.get('http://10.64.103.151:8000/getWeekndRequests').map(res => res.json()).subscribe(data => {
              console.log(data.employeeList);
              let empList = data.employeeList;
              let flag : boolean= false;
              let empData :any ;
              empList.forEach((emp) => {
                if (emp.employeeName == this.username && emp.Password == this.passWord) {
                  flag = true; 
                  empData = emp;  
                }
              })
              if(flag){      
                this.navCtrl.push(RequestPage ,{'userData':this.username,'employeeData': empData});
              } else {
                const alert = this.alertCtrl.create({
                  title: 'Error',
                  subTitle: 'Authentication failed',
                  buttons: ['OK']
                });
                alert.present();
              }
         });*/

        }

    }
}
