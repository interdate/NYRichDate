import {Component} from '@angular/core';
import {Headers, RequestOptions} from '@angular/http';
import {AlertController,LoadingController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Http} from '@angular/http';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
    providers: [Storage],
    templateUrl: 'api.html'
})
export class ApiQuery {

    public url: any;
    public header: RequestOptions;
    public response: any;
    public username: any;
    public password: any;
    public status: any = '';
    public back: any = false;
    public storageRes: any;
    public loading: any;
    public showFooter: any = true;
    public pageName: any = 'page';

    public signupData: {  username: any, password: any };

    constructor(public storage: Storage,
                public alertCtrl: AlertController,
                public http: Http,
                public loadingCtrl: LoadingController,
                private sanitizer: DomSanitizer) {

        this.url = 'http://localhost:8100';
        //this.url = 'https://www.nyrichdate.com';

        this.storage.get('user_id').then((val) => {
            this.storage.get('username').then((username) => {
                this.username = username;
            });
            this.storage.get('password').then((password) => {
                this.password = password;
            });
        });
        this.storage = storage;
    }

    safeHtml(html) {
        return this.sanitizer.bypassSecurityTrustHtml(html);
        //return this.sanitizer.bypassSecurityTrustScript(html);
    }

    sendPhoneId(idPhone) {
        //alert(idPhone);
        let data = JSON.stringify({phone_id: idPhone});
        this.http.post(this.url + '/api/v1/phones', data, this.setHeaders(true)).subscribe(data => {
            //alert(data.json().success);
        });
    }

    setUserData(data) {
        this.setStorageData({label: 'username', value: data.username});
        this.setStorageData({label: 'password', value: data.password});
    }


    setStorageData(data) {
        this.storage.set(data.label, data.value);
    }

    getStorageData(data) {
        /*
         this.storage.get(data).then((res) => {
         console.log(this.storageRes);
         this.storageRes = res;
         });
         setTimeout(function(){
         console.log(this.storageRes);
         return this.storageRes;
         },2000);
         */
    }

    showLoad(txt = 'Please wait...') {

        this.loading = this.loadingCtrl.create({
            content: txt
        });

        this.loading.present();
    }

    hideLoad() {
        if (!this.isLoaderUndefined())
            this.loading.dismiss();
        this.loading = undefined;
    }

    isLoaderUndefined(): boolean {
        return (this.loading == null || this.loading == undefined);
    }


    getUserData() {
        this.storage.get('user_id').then((val) => {
            this.storage.get('username').then((username) => {
                this.username = username;
            });
            this.storage.get('password').then((password) => {
                this.password = password;
            });
        });
        return {username: this.username, password: this.password}
    }

    setHeaders(is_auth = false, username = false, password = false) {

        if (username != false) {
            this.username = username;
        }

        if (password != false) {
            this.password = password;
        }

        let myHeaders: Headers = new Headers;

        myHeaders.append('Content-type', 'application/json');
        myHeaders.append('Accept', '*/*');
        myHeaders.append('Access-Control-Allow-Origin', '*');

        if (is_auth == true) {
            myHeaders.append("Authorization", "Basic " + btoa(this.username + ':' + this.password));
        }
        this.header = new RequestOptions({
            headers: myHeaders
        });
        return this.header;
    }

    ngAfterViewInit() {

        this.storage.get('user_id').then((val) => {
            this.storage.get('username').then((username) => {
                this.username = username;
            });
            this.storage.get('password').then((password) => {
                this.password = password;
            });
        });
    }
}
