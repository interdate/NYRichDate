import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {RegistrationOnePage} from '../registration-one/registration-one';
import {PasswordRecoveryPage} from '../password-recovery/password-recovery';
import {HelloIonicPage} from '../hello-ionic/hello-ionic';
import {ApiQuery} from '../../library/api-query';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {ActivationPage} from '../activation/activation';
import {RegistrationFourPage} from "../registration-four/registration-four";
import 'rxjs/add/operator/catch';

declare var $: any;

//import { MyApp } from '../app/app.component';
/*
 Generated class for the Login page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
    providers: [Storage]
})
export class LoginPage {

    form: { errors: any, login: any } = {errors: {}, login: {username: {label: ''}, password: {label: ''}}};
    errors: any;
    header: RequestOptions;
    user: any = {id: '', name: ''};


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public http: Http,
                public api: ApiQuery,
                public storage: Storage,
                //public myApp: MyApp,
                public toastCtrl: ToastController) {

        this.http.get(api.url + '/open_api/login', api.header).subscribe(data => {
            this.form = data.json();
            this.storage.get('username').then((username) => {
                this.form.login.value = username;
                this.user.name = username;
            });

        });

        this.storage = storage;

        if (navParams.get('page') && navParams.get('page')._id == "logout") {
            this.api.setHeaders(false, null, null);
            // Removing data storage
            this.storage.remove('status');
            this.storage.remove('password');
            this.storage.remove('user_id');
            this.storage.remove('user_photo');


            /*this.storage.get('deviceToken').then((deviceToken) => {
             this.storage.clear();
             this.storage.set('deviceToken', deviceToken);
             });
             */
        }
    }

    formSubmit() {
        this.form.login.username.value = this.user.name;
        let username = this.form.login.username.value;
        let password = this.form.login.password.value;

        if (username == "") {
            username = "nologin";
        }

        if (password == "") {
            password = "nopassword";
        }


        this.http.post(this.api.url + '/open_api/logins.json','', this.setHeaders()).map((res: Response) => res.json()).subscribe(data => {

            this.validate(data);

        }, err => {
            this.errors = this.form.errors.bad_credentials;
            console.log(this.errors);
        });

        /*this.storage.get('status').then((val) => {
            if (!val) {
                let that = this;
                setTimeout(function () {
                    that.errors = that.form.errors.bad_credentials;
                },900);
            }
        });*/


    }

    setHeaders() {
        let myHeaders: Headers = new Headers;
        myHeaders.append('Content-type', 'application/json');
        myHeaders.append('Accept', '*/*');
        myHeaders.append('Access-Control-Allow-Origin', '*');
        myHeaders.append("username", this.form.login.username.value);
        myHeaders.append("password", this.form.login.password.value);

        this.header = new RequestOptions({
            headers: myHeaders
        });
        return this.header;
    }

    validate(response) {
        this.storage.set('username', this.form.login.username.value);
        this.storage.set('password', this.form.login.password.value);
        this.storage.set('status', response.status);
        this.storage.set('user_id', response.id);
        this.storage.set('user_photo', response.photo);

        this.api.setHeaders(true, this.form.login.username.value, this.form.login.password.value);

        if (response.status == "login") {
            this.navCtrl.push(HelloIonicPage, {
                params: 'login',
                username: this.form.login.username.value,
                password: this.form.login.password.value
            });

        } else if (response.status == "no_photo") {
            this.user.id = response.id;

            let toast = this.toastCtrl.create({
                message: response.texts.photoMessage,
                showCloseButton: true,
                closeButtonText: 'Ok'
            });

            toast.present();
            this.navCtrl.push(RegistrationFourPage, {
                user: this.user,
                username: this.form.login.username.value,
                password: this.form.login.password.value
            });
        } else if (response.status == "not_activated") {
            this.navCtrl.push(ActivationPage);
        }
        this.storage.get('deviceToken').then((deviceToken) => {
            this.api.sendPhoneId(deviceToken);
        });

        console.log(response.status);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    onRegistrationPage() {
        this.navCtrl.push(RegistrationOnePage);
    }

    onPasswordRecoveryPage() {
        this.navCtrl.push(PasswordRecoveryPage);
    }

}

