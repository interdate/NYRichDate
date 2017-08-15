import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiQuery } from '../../library/api-query';
import { Http } from '@angular/http';
/*
  Generated class for the PasswordRecovery page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-password-recovery',
  templateUrl: 'password-recovery.html'
})
export class PasswordRecoveryPage {

  form: { form: any } = { form: { email: {}, _token: {} } } ;

  email_err: any;

  constructor(
          public navCtrl: NavController,
          public navParams: NavParams,
          public http: Http,
          public api: ApiQuery,
          public toastCtrl: ToastController) {

         this.http.get(api.url+'/open_api/password',api.header).subscribe(data => {
              this.form = data.json();
            },err => {
              console.log("Oops!");
            });
   }


    formSubmit() {

    var data = JSON.stringify({
          form: {
              email:   this.form.form.email.value,
              _token:  this.form.form._token.value,
          }
        });

       this.http.post(this.api.url+'/open_api/passwords',data, this.api.header).subscribe(data => this.validate( data.json() ) );
    }

    validate(response) {

      console.log(response);

      this.email_err = response.errors.form.children.email.errors;

      if( response.send == true ) {

        this.form.form.email.value = "";

         const toast = this.toastCtrl.create({
            message: response.success,
            showCloseButton: true,
            closeButtonText: 'Ok'
          });
         toast.present();
      }
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordRecoveryPage');
  }

}
