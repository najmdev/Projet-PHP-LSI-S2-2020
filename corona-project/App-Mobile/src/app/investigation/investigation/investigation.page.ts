import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InvestigationService } from '../investigation.service';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-investigation',
  templateUrl: './investigation.page.html',
  styleUrls: ['./investigation.page.scss'],
})
export class InvestigationPage {

  constructor(
    private investigationService: InvestigationService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private router: Router
  ){}

  ngOnInit() {
    this.investigationService.setHasInvestigationInStorage();
  }

  form = new FormGroup({
    question1: new FormControl('', [
      Validators.required,
    ]),
    question2: new FormControl('', [
      Validators.required,
    ]),
    question3: new FormControl(),
    question4: new FormControl(),
    question5: new FormControl(),
  });

  async onSubmit() {
    const loading = await this.loadingCtrl.create({ message: 'Veuillez patienter ...' });
    await loading.present();
    if(localStorage.getItem('hasInvestigation') =='true') {
      const alert = await this.alertCtrl.create({ 
        message: 'Investigation déjà remplie', buttons: ['OK'] 
      });
      loading.dismiss();
      await alert.present();
    }
    else if(localStorage.getItem('hasInvestigation') =='false') {
      this.investigationService.register(this.form.value).subscribe(
        async () => {
          const toast = await this.toastCtrl.create({
            message: 'Investigation Envoyée', duration: 2000, color: 'dark' 
          });
          await toast.present();
          loading.dismiss();
          this.form.reset();
          localStorage.setItem('hasInvestigation','true');
          this.router.navigateByUrl('/welcome');
        },
        async () => {
          const alert = await this.alertCtrl.create({
            message: 'There is an error', buttons: ['OK'] 
          });
          loading.dismiss();
          await alert.present();
        }
      );
    }
  }
}