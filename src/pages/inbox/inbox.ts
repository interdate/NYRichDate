import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {DialogPage} from '../dialog/dialog';
import {ApiQuery} from '../../library/api-query';
import {Http} from '@angular/http';

/*
 Generated class for the Inbox page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-inbox',
    templateUrl: 'inbox.html'
})
export class InboxPage {

    users: Array<{ id: string, message: string, username: string, newMessagesNumber: string, faceWebPath: string, noPhoto: string }>;
    texts: { no_results: string };

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public http: Http,
                public api: ApiQuery) {


        this.http.get(this.api.url + '/api/v1/inbox', this.api.setHeaders(true)).subscribe(data => {
            this.users = data.json().dialogs;
            this.texts = data.json().texts;
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad InboxPage');
    }

    toDialogPage(user) {
        this.navCtrl.push(DialogPage, {user: user});
    }

}
