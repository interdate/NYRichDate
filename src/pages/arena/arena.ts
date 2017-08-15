import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Slides, ToastController, Events} from 'ionic-angular';
import {DialogPage} from '../dialog/dialog';
import {ApiQuery} from '../../library/api-query';
import {Http} from '@angular/http';
import {ChangePhotosPage} from '../change-photos/change-photos';
import {NotificationsPage} from '../notifications/notifications';
import {ProfilePage} from '../profile/profile';
import {Injectable} from '@angular/core';
/*
 Generated class for the Arena page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-arena',
    templateUrl: 'arena.html'
})
@Injectable()
export class ArenaPage {

    @ViewChild(Slides) slides: Slides;

    users: Array<{ id: string, username: string, photo: string, age: string, area: string, image: string }>;

    texts: { like: string, add: string, message: string, remove: string, unblock: string, no_results: string  };
    notifications: any;
    checkNotifications: any;

    constructor(public navCtrl: NavController,
                public toastCtrl: ToastController,
                public navParams: NavParams,
                public http: Http,
                public events: Events,
                public api: ApiQuery) {

        /* var that = this;

         this.checkNotifications = setInterval(function () {
         that.api.storage.get('notifications').then((notifications) => {
         that.notifications = notifications;
         console.log('UPDATE NOTIFICATIONS');
         });
         }, 10000);
         */
        //this.getStatistics();

        let user_id = false;

        if (navParams.get('user')) {
            user_id = navParams.get('user');
        }

        let params = JSON.stringify({
            action: 'arena',
            user_id: user_id
        });

        this.http.post(api.url + '/api/v1/users/results', params, api.setHeaders(true)).subscribe(data => {
            this.users = data.json().users;
            this.texts = data.json().texts;

            this.api.storage.get('status').then((status) => {
                if (status == 'login') {
                    // If there's message, than user can't be on this page
                    if (data.json().arenaStatus) {
                        let toast = this.toastCtrl.create({
                            message: data.json().arenaStatus,
                            showCloseButton: true,
                            closeButtonText: 'Ok'
                        });

                        toast.present();
                        this.navCtrl.push(ChangePhotosPage);
                    }
                }
            });

        });
    }

    setNotifications() {
        this.events.subscribe('user:created', (notifications) => {
            console.log('Welcome', notifications, 'at');
            this.notifications = notifications;
        });
    }

    goToSlide(str) {

        let user = this.users[this.slides.getActiveIndex()];
        let index = this.slides.getActiveIndex();


        if (str == 'like') {

            let params = JSON.stringify({
                toUser: user.id,
            });

            this.http.post(this.api.url + '/api/v1/likes/' + user.id, params, this.api.setHeaders(true)).subscribe(data => {

            });

            this.users.splice(index, 1);
            this.slides.slideTo(index,1);

        } else {


            if (this.slides.isEnd()) {
                //this.slides.slideNext();
                var that = this;
                //setTimeout(function () {
                this.slides.slideTo(0,1);
                //this.slides.update();
                //}, 10);
            } else {
                this.slides.slideNext();
            }
        }
    }

    slideChanged(event) {
        if(this.slides.getActiveIndex() == 1){
            console.log(this.users[this.slides.getActiveIndex()]);

            console.log(this.slides.getActiveIndex());
        }
    }

    toDialog() {
        let user = this.users[this.slides.getActiveIndex()];
        this.navCtrl.push(DialogPage, {
            user: user
        });
    }

    toProfile() {
        let user = this.users[this.slides.getActiveIndex()];
        this.navCtrl.push(ProfilePage, {
            user: user
        });
    }

    toNotifications() {
        this.navCtrl.push(NotificationsPage);
    }

    /*
     getStatistics() {
     this.http.get(this.api.url + '/api/v1/statistics', this.api.setHeaders(true)).subscribe(data => {

     let statistics = data.json().statistics;

     this.notifications = statistics.newNotificationsNumber;

     });
     }*/

    ionViewDidLoad() {
        console.log('ionViewDidLoad ArenaPage');
    }


    ionViewWillLeave() {

        // enable the root left menu when leaving the tutorial page
        //this.app.getComponent('leftMenu').enable(true);
        // clearInterval(this.checkNotifications);
    }

}
