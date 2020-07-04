import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, MenuController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth/auth.service';
import { InvestigationService } from './investigation/investigation.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  timer: any;
  
  constructor(
    public menuCtrl: MenuController,
    private authService: AuthService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private investigationService: InvestigationService,
    private alertCtrl: AlertController,
  ) {
    this.initializeApp();
    this.timer = setInterval(async ()=>{
      if(localStorage.getItem('id_docteur') == 'NULL'){
        this.investigationService.verifierTraitement();
        if(localStorage.getItem('new_id_docteur') != localStorage.getItem('id_docteur') 
            && localStorage.getItem('new_id_docteur') != null){
          const alert = await this.alertCtrl.create({
            message: 'votre investigation est traite', buttons: ['OK'] 
          });
          localStorage.setItem('id_docteur',localStorage.getItem('new_id_docteur'));
          await alert.present();
        }
      }
    },3000);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  goToPage(page: string) {
    this.router.navigateByUrl(page);
    this.menuCtrl.close();
  }

  getAuthUserName(){
    return localStorage.getItem('name');
  }

  seDeconnecter(){
    this.authService.logout();
    this.router.navigateByUrl('/home');
    this.menuCtrl.close();
  }
}