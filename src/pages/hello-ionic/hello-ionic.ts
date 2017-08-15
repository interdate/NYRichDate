import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {Storage} from '@ionic/storage';
import {NavController, NavParams, LoadingController, ToastController, Events} from 'ionic-angular';
import {ApiQuery} from '../../library/api-query';
import {ProfilePage} from '../profile/profile';
import {DialogPage} from '../dialog/dialog';
import {Geolocation} from 'ionic-native';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

declare var $: any;

@Component({
    selector: 'page-hello-ionic',
    templateUrl: 'hello-ionic.html',
    providers: [Storage]
})
export class HelloIonicPage {

    //selectedItem: any;
    public options: {filter: any} = {filter: 1};
    list: any;
    action: any;
    //posts: any;
    offset: any;
    page_counter: any;
    loader: any = true;
    username: any;
    password: any;
    blocked_img: any = false;
    user_counter: any = 0;
    form_filter: any;
    filter: any = {filter: '', visible: ''};
    //url: any;
    users: Array<{ id: string, isOnline: string, isAddBlackListed: string, username: string, photo: string, age: string, region_name: string, image: string, about: {}, component: any}>;
    texts: { like: string, add: string, message: string, remove: string, unblock: string, no_results: string };
    params: { action: any, page: any, list: any } = {action: 'new', page: 1, list: ''};
    params_str: any;

    constructor(public toastCtrl: ToastController,
                public loadingCtrl: LoadingController,
                public navCtrl: NavController,
                public navParams: NavParams,
                public http: Http,
                public api: ApiQuery,
                public events: Events,
                public storage: Storage) {

        this.api.showFooter = true;

        if (navParams.get('params') && navParams.get('params') != 'login') {

            if (navParams.get('action')) {
                this.params_str = {
                    action: 'list',
                    list: navParams.get('params').list,
                    page: 1
                }
            }

            this.params_str = navParams.get('params');
            this.params = JSON.parse(this.params_str);
        }

        this.params_str = JSON.stringify(this.params);

        // If Current Page Is "Block" or "Favorited", than remove "Add Favorited"
        if (this.params.list == 'black' || this.params.list == 'favorited') {
            this.blocked_img = true;
        }

        this.page_counter = 1;

        this.storage.get('username').then((username) => {
            this.username = username;
            this.getUsers();
        });

        this.storage.get('password').then((password) => {
            this.password = password;
        });

        this.getLocation();
    }

    itemTapped(user) {

        this.navCtrl.push(ProfilePage, {
            user: user
        });
    }

    filterStatus() {
        if (this.options.filter == 1) {
            this.options.filter = 0;
        } else {
            this.options.filter = 1;
        }
    }

    toDialog(user) {
        this.navCtrl.push(DialogPage, {
            user: user
        });
    }

    addLike(user) {

        if (user.isAddLike == false) {

            user.isAddLike = true;

            let toast = this.toastCtrl.create({
                message: 'You liked ' + user.username,
                duration: 2000
            });

            toast.present();

            let params = JSON.stringify({
                toUser: user.id,
            });

            this.http.post(this.api.url + '/api/v1/likes/' + user.id, params, this.api.setHeaders(true, this.username, this.password)).subscribe(data => {
            }, err => {
                console.log("Oops!");
            });
        }
    }

    block(user, bool) {

        let toast;
        let params;

        if (user.isAddBlackListed == false && bool == true) {

            user.isAddBlackListed = true;


            params = JSON.stringify({
                list: 'Favorite',
                action: 'delete'
            });

        } else if (user.isAddBlackListed == true && bool == false) {

            user.isAddBlackListed = false;

            params = JSON.stringify({
                list: 'BlackList',
                action: 'delete'
            });
        }

        if (this.users.length == 1) {
            this.user_counter = 0;
        }

        // Remove user from list
        this.users.splice(this.users.indexOf(user), 1);
        this.events.publish('statistics:updated');


        this.http.post(this.api.url + '/api/v1/lists/' + user.id, params, this.api.setHeaders(true, this.username, this.password)).subscribe(data => {

            toast = this.toastCtrl.create({
                message: user.username + data.json().success,
                duration: 2000
            });
            toast.present();
        });
    }

    addFavorites(user) {

        if (user.isAddFavorite == false) {

            user.isAddFavorite = true;

            let toast = this.toastCtrl.create({
                message: user.username + ' ' + 'has been added to Favorites',
                duration: 2000
            });

            toast.present();

            let params = JSON.stringify({
                list: 'Favorite'
            });

            this.http.post(this.api.url + '/api/v1/lists/' + user.id, params, this.api.setHeaders(true, this.username, this.password)).subscribe(data => {
                this.events.publish('statistics:updated');
            });
        }
    }

    sortBy() {

        let params = JSON.stringify({
            action: 'search',
            filter: this.filter
        });

        if (this.params.list) {
            params = JSON.stringify({
                action: 'list',
                list: this.params.list,
                filter: this.filter
            })
        }

        this.navCtrl.push(HelloIonicPage, {
            params: params
        })
    }

    getUsers() {

        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        if (this.navParams.get('params') == 'login') {
            loading.present();
            this.username = this.navParams.get('username');
            this.password = this.navParams.get('password');

            this.http.post(this.api.url + '/api/v1/users/results', this.params_str, this.api.setHeaders(true, this.username, this.password)).subscribe(data => {
                this.users = data.json().users;
                this.texts = data.json().texts;

                this.user_counter = data.json().users.length;
                this.form_filter = data.json().filters;
                this.filter = data.json().filter;
                if (data.json().users.length < 10) {
                    this.loader = false;
                }
                loading.dismiss();
            });
        } else {
            //loading.present();
            this.http.post(this.api.url + '/api/v1/users/results', this.params_str, this.api.setHeaders(true)).subscribe(data => {
                this.users = data.json().users;
                this.texts = data.json().texts;
                this.user_counter = data.json().users.length;
                this.form_filter = data.json().filters;
                this.filter = data.json().filter;
                if (data.json().users.length < 10) {
                    this.loader = false;
                }
                loading.dismiss();
            });
        }
    }

    getLocation() {
        /*
         Geolocation.getCurrentPosition().then(pos => {
         console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
         });
         */
    }

    moreUsers(infiniteScroll: any) {
        if (this.loader) {
            this.page_counter++;
            this.params.page = this.page_counter;
            this.params_str = JSON.stringify(this.params);

            this.http.post(this.api.url + '/api/v1/users/results', this.params_str, this.api.setHeaders(true)).subscribe(data => {
                if (data.json().users.length < 10) {
                    this.loader = false;
                }
                for (let person of data.json().users) {
                    this.users.push(person);
                }
            });

            infiniteScroll.complete();
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    /*ngAfterViewInit() {

     if (this.navParams.get('page')) {
     //console.log('tertertert',this.navParams.get('page'));
     }
     }*/
}
