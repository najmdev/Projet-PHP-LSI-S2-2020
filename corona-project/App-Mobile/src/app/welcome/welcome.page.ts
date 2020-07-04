import { Component } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { InvestigationService } from '../investigation/investigation.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage {

  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private investigationService: InvestigationService
  ) { }

  async suivreInvestigation() {
    const loading = await this.loadingCtrl.create({ message: 'Verification...' });
    await loading.present();
    this.investigationService.verifierInvestigation(this.alertCtrl,loading);
  }
  
}