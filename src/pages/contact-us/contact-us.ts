import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {ApiQuery} from '../../library/api-query';
import {Http} from '@angular/http';

declare var $: any;


/*
 Generated class for the ContactUs page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-contact-us',
    templateUrl: 'contact-us.html'
})
export class ContactUsPage {

    form: { form: any } = {form: {username: {}, subject: {}, email: {}, _token: {}, text: {}}};

    email_err: any;
    text_err: any;
    subject_err: any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public http: Http,
                public api: ApiQuery,
                public toastCtrl: ToastController) {

        api.storage.get('user_id').then((user_id) => {

            this.http.get(api.url + '/open_api/contact?id=' + user_id, api.header).subscribe(data => {
                this.form = data.json();

            }, err => {
                console.log("Oops!");
            });
        });



    }

    formSubmit() {

        var params = JSON.stringify({
            contact: {
                email: this.form.form.email.value,
                text: this.form.form.text.value,
                subject: this.form.form.subject.value,
                _token: this.form.form._token.value,
            }
        });

        this.http.post(this.api.url + '/open_api/contacts', params, this.api.header).subscribe(data => this.validate(data.json()));
    }

    back() {
        //Keyboard.close();
        this.navCtrl.pop();
        setTimeout(function () {
            $('.scroll-content, .fixed-content').css({'margin-bottom': '57px'});
        }, 500);
    }

    validate(response) {
        this.email_err = response.errors.form.children.email.errors;
        this.subject_err = response.errors.form.children.subject.errors;
        this.text_err = response.errors.form.children.text.errors;

        if (response.send == true) {

            //this.form.form.email.value = "";
            this.form.form.text.value = "";
            this.form.form.subject.value = "";

            const toast = this.toastCtrl.create({
                message: 'Your request successfully sent',
                showCloseButton: true,
                closeButtonText: 'Ok'
            });
            toast.present();
        }
    }

    ionViewDidLoad() {

    }
}
