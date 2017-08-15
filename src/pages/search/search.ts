import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AdvancedSearchPage } from '../advanced-search/advanced-search';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { Http } from '@angular/http';
import { ApiQuery } from '../../library/api-query';

declare var $:any;

/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  age: any;
  areas: Array<{ title: any }>;
  ages: Array<{ num: number }> = [];

  type_search: any = "";
  form: { form: any } = {
    form: {
      distance: { },
      username: {},
      region: { choices: [[]], },
      ageFrom: {choices: [[]], label: ''},
      ageTo: {choices: [[]], label: ''},
     }
  } ;


    ageLower: any = 20;
    ageUpper: any = 50;

    default_range: any = { lower: this.ageLower, upper: this.ageUpper }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public api: ApiQuery
    ) {

    this.age = {
      'lower': this.form.form.ageFrom.value,
      'upper': this.form.form.ageTo.value
    };

    for (let i = 18; i <= 80; i++) {
      this.ages.push({num: i});
    }

    //this.form.form.ageFrom.value = 20;
    //this.form.form.ageTo.value = 50;

    this.http.get( api.url + '/api/v1/search?advanced=0', api.setHeaders(true) ).subscribe(data => {

       this.form.form = data.json();
       console.log(this.form);

      },err => {
        console.log("Oops!");
      });
  }

  SeachForm1(search_type) {
    console.log(this.form);
    this.toSearchResultsPage('search-form-1');
  }


  ionViewDidLoad() {

    this.type_search = 'search-1';

    $('.input-wrapper').delegate('.search-1','click', function() {
        //console.log(this.areas);
     });
  }

  toSearchResultsPage(search_type){

    if( search_type == "search-form-1" ) {
    console.log(this.ageLower);
    console.log(this.ageUpper);

      let params = JSON.stringify({
        action: 'search',
        quick_search: {
          region: this.form.form.region.value,
          ageFrom: this.form.form.ageFrom.value,
          ageTo: this.form.form.ageTo.value,
          distance: this.form.form.distance.value
        }
      });
      /*let params = "action=search&quick_search[region]=" + this.form.form.region.value +
      "&quick_search[ageFrom]="+ this.age.lower +
      "&quick_search[ageTo]=" + this.age.upper;*/

      this.navCtrl.push(HelloIonicPage, { params: params });
    }else{
      let params = JSON.stringify({
        action: 'search',
        quick_search: {
          username: this.form.form.username.value
        }
      });

      this.navCtrl.push(HelloIonicPage, { params: params });
    }
  }

  getAgeValues(event) {
    if( event.value.upper != 0) {
      this.ageUpper = event.value.upper;
    }
    if( event.value.lower != 0) {
      this.ageLower = event.value.lower;
    }
  }

  toAdvancedPage() {
    this.navCtrl.push(AdvancedSearchPage);
  }
}
