import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) { }

  form = new FormGroup({
    nom: new FormControl('', [
      Validators.required,
    ]),
    prenom: new FormControl('', [
      Validators.required,
    ]),
    age: new FormControl('', [
      Validators.required,
    ]),
    sexe: new FormControl('', [
      Validators.required,
    ]),
    adresse: new FormControl('', [
      Validators.required,
    ]),
    ville: new FormControl('', [
      Validators.required,
    ]),
    telephone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
  });

  async onSubmit() {
    const loading = await this.loadingCtrl.create({ message: 'Veuillez patienter ...' });
    await loading.present();
    this.authService.register(this.form.value).subscribe(
      async () => {
        const toast = await this.toastCtrl.create({ message: 'Compte créé avec succès', duration: 2000, color: 'dark' });
        await toast.present();
        loading.dismiss();
        this.form.reset();
        this.router.navigateByUrl('/login');
      },
      async () => {
        const alert = await this.alertCtrl.create({ message: 'Cet email existe déjà', buttons: ['OK'] });
        loading.dismiss();
        await alert.present();
      }
    );
  }
}