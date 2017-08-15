import {Component} from '@angular/core';
import {NavController, NavParams, ActionSheetController, AlertController, LoadingController} from 'ionic-angular';
import {ImagePicker, Camera, Transfer} from 'ionic-native';
import {ApiQuery} from '../../library/api-query';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Storage} from '@ionic/storage';
import {HelloIonicPage} from '../hello-ionic/hello-ionic';
import {PagePage} from '../page/page';
import {ActivationPage} from "../activation/activation";
/*
 Generated class for the ChangePhotos page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-registration-four',
    templateUrl: 'registration-four.html',
    providers: [Storage]

})
export class RegistrationFourPage {

    image: any;
    photos: any;
    imagePath: any;
    username: any = false;
    password: any = false;
    new_user: any = false;
    gender: any;
    user: any;

    dataPage: { noPhoto: any, texts: any, photos: Array<{ _id: string, face: string, isValid: string, isMain: string, url: any}> };
    description: { text1: any, text2: any, text3: any, text4: any };

    constructor(public actionSheetCtrl: ActionSheetController,
                public navCtrl: NavController,
                public navParams: NavParams,
                public alertCtrl: AlertController,
                public http: Http,
                public api: ApiQuery,
                public storage: Storage,
                public loadingCtrl: LoadingController) {


        this.storage.get('user_id').then((val) => {
            this.storage.get('username').then((username) => {
                this.username = username;
            });
            this.storage.get('password').then((password) => {
                this.password = password;
            });
        });

        if (navParams.get('username') && navParams.get('password')) {
            this.password = navParams.get('password');
            this.username = navParams.get('username');
            this.gender = navParams.get('gender');
            this.user = navParams.get('user');
        }

        this.getPageData();
        this.image = navParams.get('images');

    }

    delete(photo) {
        let confirm = this.alertCtrl.create({
            title: 'Delete this photo?',
            buttons: [
                {
                    text: 'No',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                }, {
                    text: 'Yes',
                    handler: () => {
                        this.postPageData('deleteImage', photo);
                    }
                }
            ]
        });
        confirm.present();
    }


    getCount(num) {
        return parseInt(num) + 1;
    }


    getPageData() {

        this.http.get(this.api.url + '/api/v1/photos/json.json', this.api.setHeaders(true, this.username, this.password)).subscribe(data => {
            this.dataPage = data.json();
            this.new_user = data.json().texts.register_end_button;
            this.description = data.json().texts.description;
            this.photos = Object.keys(this.dataPage.photos);
        }, err => {
            console.log("Oops!");
        });
    }


    getPage(id) {
        this.navCtrl.push(PagePage, {id: id});
    }

    safeHtml(el): any {
        let html = this.description;
        let div: any = document.createElement('div');
        div.innerHTML = html;
        [].forEach.call(div.getElementsByTagName("a"), (a) => {
            var pageHref = a.getAttribute('click');
            if (pageHref) {
                a.removeAttribute('click');
                a.onclick = () => this.getPage(pageHref);
            }
        });
        if (el.innerHTML == '') {
            el.appendChild(div);
        }
    }


    postPageData(type, params) {

        if (type == 'mainImage') {
            console.log('Param', params);
            var data = JSON.stringify({setMain: params.id});

        } else if ('deletePage') {
            var data = JSON.stringify({
                delete: params.id
            });
        }


        let myHeaders: Headers = new Headers;
        myHeaders.append('Content-type', 'application/json');
        myHeaders.append('Accept', '*/*');
        myHeaders.append('Access-Control-Allow-Origin', '*');
        myHeaders.append("Authorization", "Basic " + btoa(this.username + ":" + this.password));
        let header = new RequestOptions({
            headers: myHeaders
        });

        this.http.post(this.api.url + '/api/v1/photos.json', data, this.api.setHeaders(true, this.username, this.password)).subscribe(data => {

            this.dataPage = data.json();
            this.photos = Object.keys(this.dataPage.photos);
            console.log(this.photos);
        }, err => {
            console.log("Oops!");
        });
    }


    edit(photo) {

        let mainOpt = [];
        /*{
         text: 'Preview photo',
         icon: 'person',
         handler: () => {
         console.log('Destructive clicked');
         }
         }
         */
        console.log(photo);
        if (!photo.isMain && photo.isValid) {

            mainOpt.push({
                    text: this.dataPage.texts.set_as_main_photo,
                    icon: 'contact',
                    handler: () => {
                        this.postPageData('mainImage', photo);
                    }
                }
            );
        }
        mainOpt.push({
            text: this.dataPage.texts.delete,
            role: 'destructive',
            icon: 'trash',
            handler: () => {
                this.delete(photo);
            }
        });
        mainOpt.push({
            text: this.dataPage.texts.cancel,
            role: 'destructive',
            icon: 'close',
            handler: () => {
                console.log('Cancel clicked');
            }
        });


        var status = photo.isValid ?
            this.dataPage.texts.approved : this.dataPage.texts.waiting_for_approval;

        let actionSheet = this.actionSheetCtrl.create({
            title: 'Edit Photo',

            subTitle: this.dataPage.texts.status + ': ' + status,

            buttons: mainOpt
        });
        actionSheet.present();
    }

    add() {

        let actionSheet = this.actionSheetCtrl.create({
            title: this.dataPage.texts.add_photo,
            buttons: [
                {
                    text: this.dataPage.texts.choose_from_camera,
                    icon: 'aperture',
                    handler: () => {
                        this.openCamera();
                    }
                }, {
                    text: this.dataPage.texts.choose_from_gallery,
                    icon: 'photos',
                    handler: () => {
                        this.openGallery();
                    }
                }, {
                    text: this.dataPage.texts.cancel,
                    role: 'destructive',
                    icon: 'close',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }


    openGallery() {

        let options = {
            maximumImagesCount: 1,
            width: 600,
            height: 600,
            quality: 100
        };

        ImagePicker.getPictures(options).then(
            (file_uris) => {
                this.uploadPhoto(file_uris[0]);
            },

            (err) => {
                //alert(JSON.stringify(err));
            }
        );
    }


    openCamera() {
        let cameraOptions = {
            quality: 100,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 600,
            targetHeight: 600,
            saveToPhotoAlbum: true,
            chunkedMode: true,
            correctOrientation: true
        };

        Camera.getPicture(cameraOptions).then((imageData) => {
            this.uploadPhoto(imageData);
        }, (err) => {
            //alert(JSON.stringify(err));
        });
    }


    uploadPhoto(url) {

        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        loading.present();

        this.storage.get('user_id').then((val) => {

            let options = {
                fileKey: "photo",
                fileName: 'test.jpg',
                chunkedMode: false,
                mimeType: "image/jpg",
                headers: {Authorization: "Basic " + btoa(this.username + ":" + this.password)}
            };

            const fileTransfer = new Transfer();

            fileTransfer.upload(url, this.api.url + '/api/v1/photos.json', options).then((entry) => {

                this.navCtrl.push(RegistrationFourPage);
                loading.dismiss();
            }, (err) => {
                //alert(JSON.stringify(err));
                loading.dismiss();
            });
        });


        /*
         let loader = this.loadingCtrl.create({
         content: "Please wait..."
         });
         loader.present();

         let filename = this.imagePath.split('/').pop();
         let options = {
         fileKey: "file",
         fileName: filename,
         chunkedMode: false,
         mimeType: "image/jpg",
         params: { 'title': this.postTitle, 'description': this.desc }
         };


         const fileTransfer = new Transfer();

         fileTransfer.upload(this.imageNewPath, AppSettings.API_UPLOAD_ENDPOINT,
         options).then((entry) => {
         this.imagePath = '';
         this.imageChosen = 0;

         }, (err) => {
         alert(JSON.stringify(err));
         });*/
    }


    onHomePage() {
        if (this.gender == 1) {
            this.navCtrl.push(ActivationPage);
        } else {
            this.navCtrl.push(HelloIonicPage);
        }
    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad ChangePhotosPage');
    }

}
