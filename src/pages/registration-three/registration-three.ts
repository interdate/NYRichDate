import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ApiQuery } from '../../library/api-query';
import {RegistrationFourPage} from "../registration-four/registration-four";

/*
 Generated class for the RegistrationThree page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */

declare var $:any;

@Component({
    selector: 'page-registration',
    templateUrl: 'registration-three.html',
    providers: [Storage]
})

export class RegistrationThreePage {

    user:any = {id: ''}

    form:{ form: any } = {
        form: {
            about: {},
            hobbies: {choices: [[]]},
            looking: {},
            _token: {}
        }
    };

    err:{
        about: { errors: any },
        hobbies: { errors: any },
        looking: { errors: any },
    } = {
        about: {errors: []},
        hobbies: {errors: []},
        looking: {errors: []},
    };

    errKeys:any;

    constructor(public navCtrl:NavController,
                public navParams:NavParams,
                public http:Http,
                public storage:Storage,
                public toastCtrl:ToastController,
                public api:ApiQuery,
                public alertCtrl:AlertController) {

        /*
         window.addEventListener('native.keyboardshow', function(){
         $('.footerMenu').hide();
         $('.scroll-content, .fixed-content').css({'margin-bottom': '58px'});

         let toast = this.toastCtrl.create({
         message: 'User was added successfully',
         duration: 3000
         });
         toast.present();

         });
         window.addEventListener('cdhide', function(){
         $('.footerMenu').show();
         $('.scroll-content, .fixed-concctent').css({'margin-bottom':'122px'});
         this.toast.dismiss();
         });
         */

        let params = navParams.get('form');

        this.form.form = params;

        console.log(this.form.form);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegistrationThreePage');
    }

    formSubmit() {

        var data = JSON.stringify({
            flow_signUp_instance: this.form.form.flow_signUp_instance.value,
            flow_signUp_step: this.form.form.flow_signUp_step.value,
            sign_up_three: {
                about: this.form.form.about.value,
                hobbies: this.form.form.hobbies.value,
                looking: this.form.form.looking.value,
                _token: this.form.form._token.value
            }
        });

        this.http.post(this.api.url + '/open_api/signs/ups', data, this.api.header)
            .subscribe(data => {
                this.validate(data.json())
            }, err => {
                alert(JSON.stringify(err));
            });
    }

    validate(response) {

        if (typeof response.user != 'undefined' && typeof response.user.form.flow_signUp_step != 'undefined' && response.user.form.flow_signUp_step.value == 3) {
            console.log('Response1: ', response);

            this.err = response.user.errors.form.children;
            this.errKeys = Object.keys(this.err);
            /*this.navCtrl.push(RegistrationThreePage, {
             form: response.user.form
             });
             */
        } else {

            //let user = this.api.getUserData();

            //this.storage.set('username', user.username );
            //this.storage.set('password', user.password);
            this.storage.set('status', response.status);
            this.storage.set('user_id', response.id);
            this.storage.set('user_photo', response.photo);

            //this.api.setHeaders(true, user.username, user.password );

            console.log('Response2: ', response);
            if (response.status == 'no_photo') {
                this.user.id = response.id;
                this.storage.get('user_data').then((val) => {
                    this.navCtrl.push(RegistrationFourPage, {
                        gender: 0,
                        user: this.user,
                        username: val.username,
                        password: val.password,
                        new_user: response.texts.register_end_button
                    });
                });
            }
            if (response.status == 'not_activated') {
                this.storage.get('user_data').then((val) => {
                    this.storage.set('username', val.username);
                    this.storage.set('password', val.password);
                    this.api.setHeaders(true, val.username, val.password);
                    this.navCtrl.push(RegistrationFourPage, {
                        gender: 1,
                        user: this.user,
                        username: val.username,
                        password: val.password,
                        //new_user: response.texts.register_end_button
                    });
                });

            }
        }
        this.api.hideLoad();
    }

}
