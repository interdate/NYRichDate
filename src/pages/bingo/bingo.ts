import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiQuery } from '../../library/api-query';
import { DialogPage } from '../dialog/dialog';

/*
  Generated class for the Bingo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-bingo',
  templateUrl: 'bingo.html'
})
export class BingoPage {

  data: { user: any, texts: any };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiQuery) {

    this.data = navParams.get('data');

    this.data.texts.text = this.data.texts.text.replace('USERNAME',this.data.user.username);

    //console.log(this.data.texts.text);
  }

  toDialog() {
    this.data.user.id = this.data.user.contact_id;
    this.navCtrl.push(DialogPage,{ user: this.data.user });
  }

  goBack() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BingoPage');
  }

}
