import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvestigationService {

  private url = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) { }

  register(investigation: any) {
    return this.http.post(`${this.url}/registerInvestigation`, investigation, {
      headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}
    });
  }

  setIdDocteurInStorage() {
    var items = [];
    var id_doc: number;
    this.http.get(`${this.url}/allInvestigations`).toPromise().then(data => {
      for (let key in data) {
        if (data.hasOwnProperty(key))
          items.push(data[key]);
      }
      for (let i=0;i<items.length;i++) {
        if(items[i]['id_patient'] == localStorage.getItem('id_patient')){
          id_doc = items[i]['id_docteur'];
          break;
        }
      }
      if(id_doc!= null)
        localStorage.setItem('id_docteur',''+id_doc);
      else
        localStorage.setItem('id_docteur','NULL');
    });
  }

  setIdPatientInStorage(id_user: number) {
    var items = [];
    this.http.get(`${this.url}/allPatients`).toPromise().then(data => {
      for (let key in data) {
        if (data.hasOwnProperty(key))
          items.push(data[key]);
      }
      for (let i=0;i<items.length;i++) {
        if(items[i]['id_user'] == id_user){
          localStorage.setItem('id_patient',items[i]['id']);
          break;
        }
      }
      this.setIdDocteurInStorage();
    });
  }

  setHasInvestigationInStorage() {
    var items = [];
    this.setIdPatientInStorage(parseInt(localStorage.getItem('id')));
    this.http.get(`${this.url}/allInvestigations`).toPromise().then(data => {
      for (let key in data) {
        if (data.hasOwnProperty(key))
          items.push(data[key]);
      }
      localStorage.setItem('hasInvestigation','false');
      for (let i=0;i<items.length;i++) {
        if(items[i]['id_patient'] == localStorage.getItem('id_patient')){
          localStorage.setItem('hasInvestigation','true');
          break;
        }
      }
    });
  }

  verifierInvestigation(alertCtrl: any, loading: any) {
    var items = [];
    var id_docteur: number;
    var traite: boolean;
    var hasInvest: boolean;
    this.setIdPatientInStorage(parseInt(localStorage.getItem('id')));
    this.http.get(`${this.url}/allInvestigations`).toPromise().then(async data => {
      for (let key in data) {
        if (data.hasOwnProperty(key))
          items.push(data[key]);
      }
      hasInvest=false;
      for (let i=0;i<items.length;i++) {
        if(items[i]['id_patient'] == localStorage.getItem('id_patient')){
          id_docteur=items[i]['id_docteur'];
          traite=items[i]['traite'];
          hasInvest=true;
          break;
        }
      }
      if(hasInvest==true){
        if(id_docteur!= null){
          if(traite == true){
            const alert = await alertCtrl.create({ 
              message: "!!! Votre resultat est positif. <br>Veuillez visiter le plus proche hôpital"+
              " <br/>le plus tôt possible et ne contacter aucune personne.",
              buttons: ['OK'] 
            });
            loading.dismiss();
            await alert.present();
          } else {
            const alert = await alertCtrl.create({ 
              message: "Votre resultat est négatif. <br>Veuillez respecter toutes les précautions nécessaires",
              buttons: ['OK'] 
            });
            loading.dismiss();
            await alert.present();
          }
        } else {
          const alert = await alertCtrl.create({ 
            message: "Votre investigation n'est pas encore traitée",
            buttons: ['OK'] 
          });
          loading.dismiss();
          await alert.present();
        }
      } else {
        const alert = await alertCtrl.create({ 
          message: "Vous n'avez pas une investigation.<br/>Veuillez remplir votre investigation",
          buttons: ['OK'] 
        });
        loading.dismiss();
        await alert.present();
      }
    });
  }

  verifierTraitement(){
    var items = [];
    var id_doc: number;
    this.http.get(`${this.url}/allInvestigations`).toPromise().then(async data => {
      for (let key in data) {
        if (data.hasOwnProperty(key))
          items.push(data[key]);
      }
      for (let i=0;i<items.length;i++) {
        if(items[i]['id_patient'] == localStorage.getItem('id_patient')){
          id_doc = items[i]['id_docteur'];
          break;
        }
      }
      if(id_doc!= null)
        localStorage.setItem('new_id_docteur',''+id_doc);
      else
        localStorage.setItem('new_id_docteur','NULL');
    });
  }

}