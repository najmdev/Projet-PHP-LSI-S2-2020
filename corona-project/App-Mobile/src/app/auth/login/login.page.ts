import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
  ) { }

  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
  });

  async onSubmit() {
    const loading = await this.loadingCtrl.create({ message: 'Connexion ...' });
    await loading.present();
    this.authService.login(this.form.value).subscribe (
      token => {
        this.authService.isPatient(token,this.form.value['email'],this.alertCtrl,loading);
        this.form.reset();
      },
      async () => {
        const alert = await this.alertCtrl.create({
           message: 'Email ou Password incorrect', buttons: ['OK'] 
        });
        await alert.present();
        loading.dismiss();
      }
    );
  }

}