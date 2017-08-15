import {Component} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {ApiQuery} from '../../library/api-query';
import {Http} from '@angular/http';
import {RegistrationTwoPage} from '../registration-two/registration-two'
import {Storage} from '@ionic/storage';
import {PagePage} from '../page/page';

/*
 Generated class for the RegistrationOne page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */

@Component({
    selector: 'page-registration',
    templateUrl: 'registration-one.html',
    providers: [Storage]
})

export class RegistrationOnePage {

    form: { form: any } = {
        form: {
            username: {},
            email: {first: {}, second: {}},
            password: {first: {}, second: {}},
            gender: {choices: [[]]},
            birthday: {value: {day: {}, month: {}, year: {}}},
            region: {choices: [[]]},
            area: {choices: [[]]},
            zipCode: {choices: [[]]},
            phone: {},
            agree: {},
            _token: {},
            flow_signUp_step: 1
        }
    };
    err: {
        username: { errors: any },
        email: { children: { first: { errors: any }, second: { errors: any } } },
        password: { children: { first: { errors: any }, second: { errors: any } } },
        gender: { errors: any },
        birthday: { errors: any },
        region: { errors: any },
        area: { errors: any },
        zipCode: { errors: any },
        phone: { errors: any },
        agree: { errors: any },
        _token: { errors: any },
        flow_signUp_step: { errors: any }
    } = {
        username: {errors: []},
        email: {children: {first: {errors: []}, second: {errors: []}}},
        password: {children: {first: {errors: []}, second: {errors: []}}},
        gender: {errors: []},
        birthday: {errors: []},
        region: {errors: []},
        area: {errors: []},
        zipCode: {errors: []},
        phone: {errors: []},
        agree: {errors: []},
        _token: {errors: []},
        flow_signUp_step: {errors: []}
    };
    errKeys: any;
    field_value: any;
    user: { region: any, username: any, email: any, email_retype: any, area: any, neighborhood: any, zip_code: any, phone: any, occupation: any, about_me: any, looking_for: any };
    name: any;
    birth: any;
    username_err: any;
    email_first_err: any;
    email_second_err: any;
    password_first_err: any;
    password_second_err: any;
    gender_err: any;
    birthday_err: any;
    agree_err: any;
    region_err: any;
    phone_err: any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public alertCtrl: AlertController,
                public http: Http,
                public api: ApiQuery,
                private sanitizer: DomSanitizer,
                public storage: Storage) {

        this.storage = storage;

        this.http.get(api.url + '/open_api/sign/up', api.header).subscribe(data => {
            this.form = data.json();
            this.form.form.agree.value = false;
            this.form.form.agree.label = sanitizer.bypassSecurityTrustHtml(this.form.form.agree.label);
        }, err => {
            console.log("Oops!");
        });
    }

    festSelected(str) {
        var data = JSON.stringify({
            sign_up_one: {
                region: this.form.form.region.value,
                area: this.form.form.area.value
            }
        });

        this.http.post(this.api.url + '/open_api/signs/ups/helpers', data, this.api.setHeaders(false)).subscribe(data => {
            this.setFormOptions(str, data.json());
        });
    }

    setFormOptions(str, data) {
        if (str == 'region') {
            this.form.form.area = data.form.area;
            this.form.form.zipCode = data.form.zipCode;
        } else if (str == 'area') {
            this.form.form.zipCode = data.form.zipCode;
        }
    }

    getPage(id) {
        this.navCtrl.push(PagePage, {id: id});
    }

    selectedGender() {
        if (this.form.form.gender.value == 1) {
            this.form.form.phone.value = "";
        }
    }

    presentPrompt(title) {

        if (title == 'Username') {
            this.name = 'username';
            this.field_value = this.form.form.username.value;
        } else if (title == 'Email') {
            this.name = 'email';
            this.field_value = this.form.form.email.first.value;
        } else if (title == 'Retype Email') {
            this.name = 'email_retype';
            this.field_value = this.form.form.email.second.value;
        } else if (title == 'Phone') {
            this.name = 'phone';
            this.field_value = this.form.form.phone.value;
        } else if (title == 'Password') {
            this.name = 'password';
            this.field_value = this.form.form.password.first.value;
        } else if (title == 'Retype Password') {
            this.name = 'retype_password';
            this.field_value = this.form.form.password.second.value;
        }

        let alert = this.alertCtrl.create({
            title: title,
            inputs: [
                {
                    name: this.name,
                    placeholder: title,
                    value: this.field_value
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
                        if (title == 'Username') {
                            this.form.form.username.value = data.username;
                        } else if (title == 'Email') {
                            this.form.form.email.first.value = data.email;
                        } else if (title == 'Retype Email') {
                            this.form.form.email.second.value = data.email_retype;
                        } else if (title == 'Phone') {
                            this.form.form.phone.value = data.phone;
                        } else if (title == 'Password') {
                            this.form.form.password.first.value = data.password;
                        } else if (title == 'Retype Password') {
                            this.form.form.password.second.value = data.retype_password;
                        }
                    }
                }
            ]
        });
        alert.present();
    }


    formSubmit() {

        this.api.showLoad();

        this.storage.set('user_data', {
            username: this.form.form.username.value,
            password: this.form.form.password.first.value
        });

        this.api.setUserData({username: this.form.form.username.value, password: this.form.form.password.first.value});

        var date_arr = ['', '', ''];

        if (typeof this.birth != 'undefined') {
            date_arr = this.birth.split('-');
        }

        var data = JSON.stringify({

            sign_up_one: {
                username: this.form.form.username.value,
                email: {
                    first: this.form.form.email.first.value,
                    second: this.form.form.email.second.value
                },
                password: {
                    first: this.form.form.password.first.value,
                    second: this.form.form.password.second.value
                },
                gender: this.form.form.gender.value,

                birthday: {
                    day: parseInt(date_arr[2]),
                    month: parseInt(date_arr[1]),
                    year: parseInt(date_arr[0])
                },
                region: this.form.form.region.value,
                area: this.form.form.area.value,
                zipCode: this.form.form.zipCode.value,
                phone: this.form.form.phone.value,
                agree: this.form.form.agree.value,
                _token: this.form.form._token.value
            }
        });

        this.http.post(this.api.url + '/app_dev.php/open_api/signs/ups', data, this.api.header).subscribe(data => this.validate(data.json()));

    }

    validate(response) {
        /*
         email: { children:{ first: { errors: any }, second: { errors: any } } },
         password: { children:{ first: { errors: any }, second:{ errors: any } } },
         gender: { errors: any },
         birthday: { errors: any },
         region: { errors:any },
         area: { errors:any },
         zipCode: { errors:any },
         phone: { errors:any },
         agree: { errors:any },*/

        if (typeof response.user.form.flow_signUp_step != 'undefined' && response.user.form.flow_signUp_step.value == 2) {

            this.navCtrl.push(RegistrationTwoPage, {
                form: response.user.form
            });

        } else {

            this.err = response.user.errors.form.children;
            this.errKeys = Object.keys(this.err);
            this.err.username.errors;
        }

        this.api.hideLoad();
    }

    ionViewDidLoad() {
    }
}
