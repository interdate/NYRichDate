import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HelloIonicPage} from '../pages/hello-ionic/hello-ionic';
import {ItemDetailsPage} from '../pages/item-details/item-details';
import {LoginPage} from '../pages/login/login';
import {ChangePasswordPage} from '../pages/change-password/change-password';
import {SearchPage} from '../pages/search/search';
import {ChangePhotosPage} from '../pages/change-photos/change-photos';
import {EditProfilePage} from '../pages/edit-profile/edit-profile';
import {ContactUsPage} from '../pages/contact-us/contact-us';
import {ProfilePage} from '../pages/profile/profile';
import {FullScreenProfilePage} from '../pages/full-screen-profile/full-screen-profile';
import {SettingsPage} from '../pages/settings/settings';
import {FreezeAccountPage} from '../pages/freeze-account/freeze-account';
import {ArenaPage} from '../pages/arena/arena';
import {AdvancedSearchPage} from '../pages/advanced-search/advanced-search';
import {InboxPage} from '../pages/inbox/inbox';
import {NotificationsPage} from '../pages/notifications/notifications';
import {DialogPage} from '../pages/dialog/dialog';
import {MainMenuPage} from '../pages/main-menu/main-menu';
import {ApiQuery} from '../library/api-query';
import {PasswordRecoveryPage} from '../pages/password-recovery/password-recovery';
import {RegistrationOnePage} from '../pages/registration-one/registration-one';
import {RegistrationTwoPage} from '../pages/registration-two/registration-two';
import {RegistrationThreePage} from '../pages/registration-three/registration-three';
import {RegistrationFourPage} from '../pages/registration-four/registration-four';
import {ActivationPage} from '../pages/activation/activation';
import {BingoPage} from '../pages/bingo/bingo';
import {PagePage} from '../pages/page/page';
import {Storage} from '@ionic/storage';
import {SelectAlertless} from '../pages/select/selectalertless';
import {FaqPage} from "../pages/faq/faq";


@NgModule({
    declarations: [
        MyApp,
        HelloIonicPage,
        ItemDetailsPage,
        LoginPage,
        ChangePasswordPage,
        SearchPage,
        ChangePhotosPage,
        ContactUsPage,
        ProfilePage,
        FullScreenProfilePage,
        SettingsPage,
        FreezeAccountPage,
        ArenaPage,
        AdvancedSearchPage,
        InboxPage,
        NotificationsPage,
        DialogPage,
        MainMenuPage,
        EditProfilePage,
        PasswordRecoveryPage,
        RegistrationOnePage,
        RegistrationTwoPage,
        RegistrationThreePage,
        RegistrationFourPage,
        ActivationPage,
        BingoPage,
        PagePage,
        ApiQuery,
        SelectAlertless,
        FaqPage
    ],
    imports: [
        IonicModule.forRoot(MyApp, {
            menuType: 'overlay',
            scrollAssist: false,
            autoFocusAssist: false
        }),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HelloIonicPage,
        ItemDetailsPage,
        LoginPage,
        ChangePasswordPage,
        SearchPage,
        ChangePhotosPage,
        ContactUsPage,
        ProfilePage,
        FullScreenProfilePage,
        SettingsPage,
        FreezeAccountPage,
        ArenaPage,
        AdvancedSearchPage,
        InboxPage,
        NotificationsPage,
        DialogPage,
        MainMenuPage,
        EditProfilePage,
        PasswordRecoveryPage,
        RegistrationOnePage,
        RegistrationTwoPage,
        RegistrationThreePage,
        RegistrationFourPage,
        ActivationPage,
        BingoPage,
        PagePage,
        SelectAlertless,
        FaqPage
    ],
    providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, ApiQuery, Storage, ArenaPage]
})

export class AppModule {
}
