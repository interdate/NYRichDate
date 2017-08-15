import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ApiQuery} from '../../library/api-query';
import {Http} from '@angular/http';
/*
 Generated class for the Faq page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */

declare var $: any;


@Component({
    selector: 'page-faq',
    templateUrl: 'faq.html'
})
export class FaqPage {

    page: Array<{ name: string, faq: string }>;

    hightlightStatus: Array<boolean> = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
                public api: ApiQuery) {
        this.getPageData();

    }

    toggleAnswer(){

    }

    getPageData() {
        this.http.get(this.api.url + '/open_api/faq', this.api.header).subscribe(data => {
            this.page = data.json().content;
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FaqPage');
    }

}
