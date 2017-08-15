import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, ToastController, Content} from 'ionic-angular';
import {ApiQuery} from '../../library/api-query';
import {Http} from '@angular/http';
import {ProfilePage} from '../profile/profile';

/*
 Generated class for the Dialog page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */

declare var $: any;

@Component({
    selector: 'page-dialog',
    templateUrl: 'dialog.html'
})

export class DialogPage {
    @ViewChild(Content) content: Content;

    user: { id: string, isOnline: string, nick_name: string, image: string };
    users: Array<{ id: string, isOnline: string, nick_name: string, image: string }>;
    texts: any = {a_conversation_with: '', title: ''};
    message: any;
    messages: Array<{ id: string, isRead: any, text: string, dateTime: string, from: any }>;
    notReadMessage: any = [];
    checkChat: any;
    //keyboard: Keyboard;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public http: Http,
                public toastCtrl: ToastController,
                public api: ApiQuery) {

        this.api.back = false;
        this.user = navParams.get('user');

        this.http.get(api.url + '/api/v1/dialogs/' + this.user.id, api.setHeaders(true)).subscribe(data => {
            this.user = data.json().dialog.contact;
            this.texts = data.json().texts;
            this.messages = data.json().history;
            for (let i = 0; i < this.messages.length; i++) {
                if(this.messages[i].isRead == false) {
                    this.notReadMessage.push(this.messages[i].id);
                }
            }
            this.scrollToBottom();
        }, err => {
            console.log("Oops!");
        });

    }

    ionViewCanEnter() {
        this.api.showFooter = false;
        this.api.pageName = 'dialog';
    }

    scrollToBottom() {
        console.log(this.content.getContentDimensions());
        this.content.scrollTo(0, 999999, 300);
    }

    back() {
        this.api.back = true;
        this.navCtrl.pop();
        this.api.showFooter = true;
        setTimeout(function () {
            $('.scroll-content, .fixed-content').css({'margin-bottom': '57px'});
        }, 500);
    }

    sendPush() {
        this.http.post(this.api.url + '/api/v1/sends/' + this.user.id + '/pushes', {}, this.api.setHeaders(true)).subscribe(data => {});
    }

    sendMessage() {

        var params = JSON.stringify({
            message: this.message
        });

        console.log('PUSH test');


        this.http.post(this.api.url + '/api/v1/sends/' + this.user.id + '/messages', params, this.api.setHeaders(true)).subscribe(data => {
            let mess = data.json().message;
            if (mess) {
                mess.text = this.message;
                this.messages.push(mess);
                this.notReadMessage.push(mess.id);
                this.sendPush();
            } else {
                let toast = this.toastCtrl.create({
                    message: data.json().errorMessage,
                    duration: 5000
                });
                toast.present();
            }

                this.scrollToBottom();
        });
    }

    getNewMessages() {
        //messages: this.notReadMessage

        var notReadMessageStr = '';

        for (let i = 0; i < this.notReadMessage.length; i++) {
            if(i == 0) {
                notReadMessageStr += '?messages[]=' + this.notReadMessage[i];
            }else {
                notReadMessageStr += '&messages[]=' + this.notReadMessage[i];
            }

        }


        this.http.get(this.api.url + '/api/v1/chats/' + this.user.id + '/new/messages'+notReadMessageStr, this.api.setHeaders(true)).subscribe(data => {
            console.log(JSON.stringify(data.json()));
            if (data.json().newMessages.length > 0) {
                for (let message of data.json().newMessages) {

                    this.messages.push(message);
                    this.scrollToBottom();
                    var params = JSON.stringify({
                        message_id: message.id
                    });
                    this.http.post(this.api.url + '/api/v1/reads/' + this.user.id + '/messages', params, this.api.setHeaders(true)).subscribe(data => {
                    });
                }

                //this.messages.push(data.json().newMessages);
            }
            if(data.json().readMessages.length > 0){
                let readMess = data.json().readMessages;
                for (let i = 0; i < this.messages.length; i++) {
                    //alert(readMess.indexOf(this.messages[i].id));
                    if (readMess.indexOf(this.messages[i].id) != '-1') {

                        this.messages[i].isRead = 1;
                        this.notReadMessage.splice(this.notReadMessage.indexOf(this.messages[i].id), 1);
                    }
                }
                /*
                for (let e = 0; this.notReadMessage.length; e++) {
                    if (readMess.indexOf(this.notReadMessage[e]) != '-1') {
                        this.notReadMessage.splice(e, 1);
                        //this.notReadMessage[e] = '';
                        //delete this.notReadMessage[e];
                    }
                }
                */
            }
        });

        //this.readMessagesStatus();
    }

    readMessagesStatus() {
        //alert(this.notReadMessage.length);
        if(this.notReadMessage.length > 0) {
            var params = JSON.stringify({
                messages: this.notReadMessage
            });

            this.http.post(this.api.url + '/api/v1/checks/messages', params, this.api.setHeaders(true)).subscribe(data => {

                for (let i = 0; i < this.messages.length; i++) {
                    //if (data.json().readMessages.indexOf(this.messages[i].id) !== '-1') {
                        //this.messages[i].isRead = 1;
                    //}
                }
                for (let e = 0; this.notReadMessage.length; e++) {
                    //if (data.json().readMessages.indexOf(this.notReadMessage[e]) !== '-1') {
                        //delete this.notReadMessage[e];
                    //}
                }
            });
        }
    }

    ionViewWillLeave() {

        // enable the root left menu when leaving the tutorial page
        //this.app.getComponent('leftMenu').enable(true);
        clearInterval(this.checkChat);
        console.log('Leave');
    }

    toProfilePage() {
        this.navCtrl.push(ProfilePage, {
            user: this.user
        });
    }

    ionViewDidLoad() {
        this.scrollToBottom();
        var that = this;
        this.checkChat = setInterval(function () {
            that.getNewMessages();
            //that.readMessagesStatus();
        }, 7000);

        $('button').click(function () {
            // clean textareaa after submit
            $('textarea').val('');
        });
    }
}