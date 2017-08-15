import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ApiQuery } from '../../library/api-query';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';

/*
  Generated class for the AdvancedSearch page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-advanced-search',
  templateUrl: 'advanced-search.html'
})
export class AdvancedSearchPage {

  form: { form: any } = {
    form: {
      region: { choices: [[]], },
      area: { choices: [[]], },
      ageTo: { choices: [[]], },
      ageFrom: { choices: [[]], },
      zodiac: { choices: [[]], },
      purposes: { choices: [[]], },
      relationshipStatus: { choices: [[]], },
      languages: { choices: [[]], },
      children: { choices: [[]], },
      status: { choices: [[]], },
      netWorth: { choices: [[]], },
      income: { choices: [[]], },
      heightFrom: { choices: [[]], },
      heightTo: { choices: [[]], },
      body: { choices: [[]], },
      eyes: { choices: [[]], },
      hair: { choices: [[]], },
      features: { choices: [[]], },
      smoking: { choices: [[]], },
      drinking: { choices: [[]], },
      ethnicity: { choices: [[]], },
      religion: { choices: [[]], },
      education: { choices: [[]], },
      distance: { choices: [[]], },
      withPhoto: { choices: [[]], },
     }
  } ;

  ageLower: any = 20;
  ageUpper: any = 50;

  ages: Array<{ num: number }> = [];

  default_range: any = { lower: this.ageLower, upper: this.ageUpper }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public api: ApiQuery
  ) {

    //this.form.form.ageFrom.value = 20;
    //this.form.form.ageTo.value = 50;

  this.http.get( api.url + '/api/v1/search?advanced=1', api.setHeaders(true) ).subscribe(data => {

  this.form.form = data.json();

    for (let i = 18; i <= 80; i++) {
      this.ages.push({num: i});
    }


  },err => {
    console.log("Oops!");
  });

  }

  toSearchResultsPage() {
    let params = JSON.stringify({
      action: 'search',
      advanced_search: {
        region: this.form.form.region.value,
        area: this.form.form.area.value,
        ageFrom: this.form.form.ageFrom.value,
        ageTo: this.form.form.ageTo.value,
        zodiac: this.form.form.zodiac.value,
        purposes: this.form.form.purposes.value,
        status: this.form.form.status.value,
        languages: this.form.form.languages.value,
        children: this.form.form.children.value,
        relationshipStatus: this.form.form.relationshipStatus.value,
        netWorth: this.form.form.netWorth.value,
        income: this.form.form.income.value,
        heightFrom: this.form.form.heightFrom.value,
        heightTo: this.form.form.heightTo.value,
        body: this.form.form.body.value,
        eyes: this.form.form.eyes.value,
        hair: this.form.form.hair.value,
        features: this.form.form.features.value,
        smoking: this.form.form.smoking.value,
        drinking: this.form.form.drinking.value,
        ethnicity: this.form.form.ethnicity.value,
        religion: this.form.form.religion.value,
        education: this.form.form.education.value,
        withPhoto: this.form.form.withPhoto.value,
        distance: this.form.form.distance.value
      }
    });
    this.navCtrl.push(HelloIonicPage, { params: params });
  }

  selectedRegion()
  {
    this.http.get(this.api.url+'/api/v1/search?advanced=1&advanced_search[region]='+this.form.form.region.value,this.api.setHeaders(true)).subscribe(data => {
      this.form.form.area = data.json().area;
      console.log(data.json());
    },err => {
      console.log("Oops!");
    });
  }

  getAgeValues(event) {
    if( event.value.upper != 0) {
      this.ageUpper = event.value.upper;
    }
    if( event.value.lower != 0) {
      this.ageLower = event.value.lower;
    }
    console.log(event);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdvancedSearchPage');
  }

}
