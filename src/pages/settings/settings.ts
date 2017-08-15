import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiQuery } from '../../library/api-query';
import { Http } from '@angular/http';
/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  form: any = { is_sent_email: '', is_sent_push: '' }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public api: ApiQuery)  {

      this.http.post(api.url+'/api/v1/settings','',api.setHeaders(true)).subscribe(data => {
         console.log("Dialogs: ",data.json());
         this.form = data.json().form;
        },err => {
          console.log("Oops!");
        });
    }

  submit() {

    var params = JSON.stringify({
          is_sent_email:   this.form.is_sent_email.value,
          is_sent_push:    this.form.is_sent_push.value
    });

    this.http.post(this.api.url+'/api/v1/settings',params,this.api.setHeaders(true)).subscribe(data => {
       console.log("Dialogs: ",data.json());
      },err => {
        console.log("Oops!");
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
