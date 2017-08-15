import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiQuery } from '../../library/api-query';
import { Http } from '@angular/http';


/*
  Generated class for the ChangePassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html'
})
export class ChangePasswordPage {

  form: { form: any } = { form: { oldPassword: {}, password: { second: {}, first: {} }, email: {}, _token: {}, text: {} } } ;

  oldPassword: any;
  first_pass : any;
  second_pass: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public api: ApiQuery,
    public toastCtrl: ToastController) {

    this.http.post(api.url+'/api/v1/passwords','',api.header).subscribe(data => {
        this.form = data.json();
        console.log(data);
      },err => {
        console.log("Oops!");
      });
  }

  formSubmit() {

  var params = JSON.stringify({
        change_password: {
            oldPassword: this.form.form.oldPassword.value,
            password: {
              first: this.form.form.password.first.value,
              second: this.form.form.password.second.value
            },
            _token:  this.form.form._token.value,
        }
      });

     this.http.post(this.api.url+'/api/v1/passwords',params, this.api.header).subscribe(data => this.validate( data.json() ) );
  }

  validate(response) {
    this.oldPassword = response.errors.form.children.oldPassword.errors;
    this.first_pass = response.errors.form.children.password.children.first.errors;
    this.second_pass = response.errors.form.children.password.children.second.errors;

    console.log(this)


    if( response.changed == true ) {

      this.api.setStorageData({ label: 'password', value: this.form.form.password.first.value });
      this.api.setHeaders(true, false, this.form.form.password.first.value);

      this.form.form.password.first.value = "";
      this.form.form.password.second.value = "";
      this.form.form.oldPassword.value = "";

       const toast = this.toastCtrl.create({
          message: 'Your request successfully sent',
          showCloseButton: true,
          closeButtonText: 'Ok'
        });
       toast.present();
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }
}
