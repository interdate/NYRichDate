import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiQuery } from '../../library/api-query';
import { Http } from '@angular/http';
import { RegistrationThreePage } from '../registration-three/registration-three'

/*
  Generated class for the RegistrationTwo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var $:any;

@Component({
  selector: 'page-registration',
  templateUrl: 'registration-two.html'
})

export class RegistrationTwoPage {

  form: { form: any } = {
    form: {
     relationshipStatus: { choices: [[]] },
     ethnicity: { choices: [[]] },
     religion: { choices: [[]] },
     languages: { choices: [[]] },
     children: { choices: [[]] },
     education: { choices: [[]] },
     occupation: {},
     smoking: { choices: [[]] },
     drinking: { choices: [[]] },
     purposes: { choices: [[]] },
     height: { choices: [[]] },
     body: { choices: [[]] },
     eyes: { choices: [[]] },
     hair: { choices: [[]] },
     features: { choices: [[]] },
     status: { choices: [[]] },
     netWorth: { choices: [[]] },
     income: { choices: [[]] },
    }
  };

  err: {
    relationshipStatus: { errors: any },
    children: { errors: any },
    ethnicity: { errors: any },
    religion: { errors: any },
    languages: { errors: any },
    education: { errors: any },
    occupation: { errors: any },
    smoking: { errors: any },
    drinking: { errors: any },
    purposes: { errors: any },
    height: { errors: any },
    body: { errors: any },
    eyes: { errors: any },
    hair: { errors: any },
    features: { errors: any },
    status: { errors: any },
    netWorth: { errors: any },
    income: { errors: any },
  } = {
    relationshipStatus: { errors:[] },
    children: { errors:[] } ,
    ethnicity: { errors:[] },
    religion: { errors:[] },
    languages: { errors:[] },
    education: { errors:[] },
    occupation: { errors:[] },
    smoking: { errors:[] },
    drinking: { errors:[] },
    purposes: { errors:[] },
    height: { errors:[] },
    body: { errors:[] },
    eyes: { errors:[] },
    hair: { errors:[] },
    features: { errors:[] },
    status: { errors: [] },
    netWorth: { errors: [] },
    income: { errors: [] },
  };

  errKeys:any;
  field_value: any;
  user : { occupation: {} };
  name : any;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public alertCtrl: AlertController,
      public http: Http,
      public api: ApiQuery
      ) {

      let params = navParams.get('form');

       this.form.form = params;

}

  formSubmit() {


    if( typeof this.form.form.status != 'undefined' ) {
        var data = JSON.stringify({
              flow_signUp_instance: this.form.form.flow_signUp_instance.value,
              flow_signUp_step: this.form.form.flow_signUp_step.value,
              sign_up_two: {
                  relationshipStatus: this.form.form.relationshipStatus.value,
                  children:     this.form.form.children.value,
                  ethnicity: this.form.form.ethnicity.value,
                  religion: this.form.form.religion.value,
                  languages: this.form.form.languages.value,
                  education: this.form.form.education.value,
                  occupation: this.form.form.occupation.value,
                  smoking: this.form.form.smoking.value,
                  drinking: this.form.form.drinking.value,
                  purposes: this.form.form.purposes.value,
                  height: this.form.form.height.value,
                  body: this.form.form.body.value,
                  eyes: this.form.form.eyes.value,
                  hair: this.form.form.hair.value,
                  features: this.form.form.features.value,
                  status: this.form.form.status.value,
                  netWorth: this.form.form.netWorth.value,
                  income: this.form.form.income.value,
                  _token: this.form.form._token.value
              }
            });
    } else {
        var data = JSON.stringify({
              flow_signUp_instance: this.form.form.flow_signUp_instance.value,
              flow_signUp_step: this.form.form.flow_signUp_step.value,
              sign_up_two: {
                  relationshipStatus: this.form.form.relationshipStatus.value,
                  children:     this.form.form.children.value,
                  ethnicity: this.form.form.ethnicity.value,
                  religion: this.form.form.religion.value,
                  languages: this.form.form.languages.value,
                  education: this.form.form.education.value,
                  occupation: this.form.form.occupation.value,
                  smoking: this.form.form.smoking.value,
                  drinking: this.form.form.drinking.value,
                  purposes: this.form.form.purposes.value,
                  height: this.form.form.height.value,
                  body: this.form.form.body.value,
                  eyes: this.form.form.eyes.value,
                  hair: this.form.form.hair.value,
                  features: this.form.form.features.value,
                  _token: this.form.form._token.value
              }
            });
    }

       this.http.post(this.api.url+'/open_api/signs/ups',data, this.api.header).subscribe(data => this.validate( data.json() ) );

    }

    validate(response) {


      if( typeof response.user.form.flow_signUp_step != 'undefined' && response.user.form.flow_signUp_step.value == 3 ) {

          this.navCtrl.push(RegistrationThreePage, {
              form: response.user.form
        });

      }else{

          this.err = response.user.errors.form.children;
          this.errKeys = Object.keys(this.err);
      }
        this.api.hideLoad();

    }

  presentPrompt(title) {

    if(title == 'Occupation') {
      this.name = 'occupation';
      //this.field_value = this.user.occupation;
      this.field_value = '234';

    }

    let alert = this.alertCtrl.create({
      title: title,
      inputs: [
        {
          name: this.name,
          placeholder: title,
          //value:  this.field_value
          value:  this.form.form.occupation.value
        }

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            if(title == 'Occupation') {
              console.log('test2: ' + title);
               this.form.form.occupation.value = data.occupation;
             }
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

}

