import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiQuery } from '../../library/api-query';
import { DialogPage } from '../dialog/dialog';
import { ArenaPage } from '../arena/arena';
import { Http } from '@angular/http';

/*
  Generated class for the Notifications page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {
  like: string = 'like';
  tabs: string = this.like;
  bingo: string = 'bingo';
  users: Array<{ id: string, date: string, username: string, is_read: string, photo: string, text: string, region_name: string, image: string, about: {}, component: any}>;
  texts: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiQuery,
    public http: Http,

    ) {

    this.http.post(api.url+'/api/v1/notifications.json',{},api.setHeaders(true)).subscribe(data => {
      this.users = data.json().users;
      this.texts = data.json().texts;
       console.log("Features: ",data.json());
      },err => {
        console.log("Oops!");
      });
  }

  toDialog(user) {
      let user_id = user.user_id;
      let bingo = user.bingo;
      this.http.post(this.api.url+'/api/v1/notifications.json',{id: user.id},this.api.setHeaders(true)).subscribe(data => {

          this.users = data.json().users;

          if( bingo ) {
              this.navCtrl.push(DialogPage, {
                  user: {'id': user_id }
              });
          }else {
              this.navCtrl.push(ArenaPage, {
                  user: user_id
              });
          }
      },err => {
          console.log("Oops!");
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

}
