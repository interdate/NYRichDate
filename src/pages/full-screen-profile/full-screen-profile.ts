import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { DialogPage } from '../dialog/dialog';
import { Http } from '@angular/http';
import { ApiQuery } from '../../library/api-query';
/*
 Generated class for the FullScreenProfile page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-full-screen-profile',
    templateUrl: 'full-screen-profile.html'
})
export class FullScreenProfilePage {

    user:any;
    myId:any;

    constructor(public toastCtrl:ToastController,
                public navCtrl:NavController,
                public navParams:NavParams,
                public http:Http,
                public api:ApiQuery) {

        this.user = navParams.get('user');

        this.api.storage.get('user_id').then((val) => {

            if (val) {
                this.myId = val;
            }
        });
    }

    goBack() {
        console.log('test');
        this.navCtrl.pop();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FullScreenProfilePage');
    }


    toDialog(user) {
        this.navCtrl.push(DialogPage, {
            user: user
        });
    }

    addFavorites(user) {
        user.isAddFavorite = true;
        let toast = this.toastCtrl.create({
            message: user.nickName + ' ' + 'has been added to Favorites',
            duration: 2000
        });

        toast.present();

        let params = JSON.stringify({
            list: 'Favorite'
        });

        this.http.post(this.api.url + '/api/v1/lists/' + user.id, params, this.api.setHeaders(true)).subscribe(data => {
            console.log(data);
        }, err => {
            console.log("Oops!");
        });
    }

    addLike(user) {
        user.isAddLike = true;
        let toast = this.toastCtrl.create({
            message: user.nickName + ' ' + ' liked',
            duration: 2000
        });

        toast.present();

        let params = JSON.stringify({
            toUser: user.id,
        });

        this.http.post(this.api.url + '/api/v1/likes/' + user.id, params, this.api.setHeaders(true)).subscribe(data => {
            console.log(data);
        }, err => {
            console.log("Oops!");
        });
    }
}
