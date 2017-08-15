import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Nav, ToastController, Content, LoadingController} from 'ionic-angular';
import {FullScreenProfilePage} from '../full-screen-profile/full-screen-profile';
import {DialogPage} from '../dialog/dialog';
import {Http} from '@angular/http';
import {ApiQuery} from '../../library/api-query';
import {Storage} from '@ionic/storage';

/*
 Generated class for the Profile page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */

declare var $: any;

@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
})
export class ProfilePage {
    @ViewChild(Content) content: Content;
    @ViewChild(Nav) nav: Nav;

    isAbuseOpen: any = false;

    user: { id: any, username: any, isAddBlackListed: any, about: { label: any }, photos: any, photo: any, url: any } = {
        id: '',
        isAddBlackListed: false,
        username: '',
        about: {label: ''},
        photos: '',
        photo: '',
        url: ''
    };

    texts: { lock: any, unlock: any } = {lock: '', unlock: ''};

    formReportAbuse: { title: any, buttons: { cancel: any, submit: any }, text: { label: any, name: any, value: any } } =
    {title: '', buttons: {cancel: '', submit: ''}, text: {label: '', name: '', value: ''}};

    myId: any = false;

    constructor(public toastCtrl: ToastController,
                public navCtrl: NavController,
                public navParams: NavParams,
                public http: Http,
                public loadingCtrl: LoadingController,
                public api: ApiQuery,
                public storage: Storage) {

        this.storage = storage;

        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        //loading.present();

        var user = navParams.get('user');

        if (user) {

            this.user = user;

            this.http.get(api.url + '/api/v1/users/' + this.user.id, api.setHeaders(true)).subscribe(data => {
                this.user = data.json();
                this.formReportAbuse = data.json().formReportAbuse;
                this.texts = data.json().texts;
                loading.dismiss();
            });
        } else {
            this.storage.get('user_id').then((val) => {

                if (val) {
                    this.myId = val;
                    this.user.id = val;
                    this.http.get(api.url + '/api/v1/users/' + this.user.id, api.setHeaders(true)).subscribe(data => {

                        this.user = data.json();
                        this.formReportAbuse = data.json().formReportAbuse;
                        this.texts = data.json().texts;
                        loading.dismiss();
                    });
                }
            });
        }

        this.api.showFooter = true;
    }

    ionViewCanEnter() {
        this.api.showFooter = true;
        this.api.pageName = 'profile';
    }

    back() {
        this.navCtrl.pop();
    }

    scrollToBottom() {
        this.content.scrollTo(0, this.content.getContentDimensions().scrollHeight, 300);
    }

    addFavorites(user) {
        user.isAddFavorite = true;
        let toast = this.toastCtrl.create({
            message: user.username + ' ' + 'has been added to Favorites',
            duration: 2000
        });

        toast.present();

        let params = JSON.stringify({
            list: 'Favorite',
        });

        this.http.post(this.api.url + '/api/v1/lists/' + user.id, params, this.api.setHeaders(true)).subscribe(data => {
            console.log(data);
        }, err => {
            console.log("Oops!");
        });
    }

    blockSubmit() {
        if (this.user.isAddBlackListed == true) {
            this.user.isAddBlackListed = false;
            var action = 'delete';
        } else {
            this.user.isAddBlackListed = true;
            var action = 'create';
        }

        let params = JSON.stringify({
            list: 'BlackList',
            action: action
        });

        this.http.post(this.api.url + '/api/v1/lists/' + this.user.id, params, this.api.setHeaders(true)).subscribe(data => {
            let toast = this.toastCtrl.create({
                message: data.json().success,
                duration: 2000
            });

            toast.present();

        }, err => {
            console.log("Oops!");
        });
    }

    addLike(user) {
        user.isAddLike = true;
        let toast = this.toastCtrl.create({
            message: user.username + ' ' + ' liked',
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

    fullPagePhotos() {
        this.navCtrl.push(FullScreenProfilePage, {
            user: this.user
        });
    }

    toDialog(user) {
        this.navCtrl.push(DialogPage, {
            user: user
        });
    }

    reportAbuseShow() {
        this.isAbuseOpen = true;
        this.scrollToBottom();
    }

    reportAbuseClose() {
        this.isAbuseOpen = false;
        this.formReportAbuse.text.value = "";
    }

    abuseSubmit() {

        let params = JSON.stringify({
            text: this.formReportAbuse.text.value,
        });

        this.http.post(this.api.url + '/api/v1/reports/' + this.user.id + '/abuses', params, this.api.setHeaders(true)).subscribe(data => {

            let toast = this.toastCtrl.create({
                message: data.json().success,
                duration: 2000
            });

            toast.present();
        }, err => {
            console.log("Oops!");
        });
        this.reportAbuseClose();
    }

    ionViewDidLoad() {
        console.log(this.user);
    }
}
