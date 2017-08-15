import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import {Http} from '@angular/http';
import {ApiQuery} from '../../library/api-query';

/*
  Generated class for the FreezeAccount page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-freeze-account',
  templateUrl: 'freeze-account.html'
})
export class FreezeAccountPage {

  public form: any = {text: { value: '' }, description: ''};

  public err: any = { status: '', text: '' };

  constructor(public navCtrl: NavController, public api: ApiQuery, public navParams: NavParams, public http: Http) {
    this.http.get(this.api.url + '/api/v1/freeze', this.api.header).subscribe(data => {
      this.form.description = data.json().description;
      this.err.text = data.json().error;
    });
  }

  /*submit() {
    this.navCtrl.push(LoginPage);
  }
  */
  submit() {

    if(this.form.text.value) {

      var params = JSON.stringify({
        'freeze_account_reason': this.form.text.value
      });

      this.http.post(this.api.url + '/api/v1/freezes', params, this.api.header).subscribe(data => this.validate(data.json(

      )));

      this.navCtrl.push(LoginPage, {page: {_id: "logout"}});
    }else{
      this.err.status = 1;
      console.log(this.err.status);
    }

  }

  validate(response) {
    console.log(response);
  }

}
