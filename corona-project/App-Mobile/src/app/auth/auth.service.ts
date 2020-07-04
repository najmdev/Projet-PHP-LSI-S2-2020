import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { InvestigationService } from '../investigation/investigation.service';
import { CarteGeoService } from '../carte-geo/carte-geo.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://127.0.0.1:8000/api';

  constructor(
    private http: HttpClient,
    private router: Router,
    private investigationService: InvestigationService,
    private carteGeoService: CarteGeoService
  ) { }

  register(user: any) {
    return this.http.post(`${this.url}/registerPatient`, user);
  }

  login(credentials: any): Observable<string> {
    return this.http.post<{ token: string }>(`${this.url}/login`, credentials).pipe(
      map(response => response.token)
    );
  }

  logout(){
    localStorage.clear();
  }

  setAuthUserNameInStorage(id: number){
    var items = [];
    this.http.get(`${this.url}/allPatients`).toPromise().then(data => {
      for (let key in data) {
        if (data.hasOwnProperty(key))
          items.push(data[key]);
      }
      for (let i=0;i<items.length;i++) {
        if(items[i]['id_user'] == id) {
          localStorage.setItem('name', items[i]['nom']+"  "+items[i]['prenom']);
          break;
        }
      }
    });
  }

  setAuthUserIdInStorage(token: string){
    var items = [];
    if(token != null) {
      this.http.get(`${this.url}/getAuthenticatedUser`,{
        headers:{Authorization: 'Bearer ' + token}
      }).toPromise().then(data => {
        for (let key in data) {
          if (data.hasOwnProperty(key))
            items.push(data[key]);
        }
        localStorage.setItem('id', items[0]['id']);
        this.setAuthUserNameInStorage(items[0]['id']);
        this.investigationService.setIdPatientInStorage(items[0]['id']);
      });
    }
  }

  isPatient(token: string, email: string, alertCtrl: any, loading: any){
    var items = [];
    var res: boolean;
    this.http.get(`${this.url}/allUsers`).toPromise().then(async data => {
      for (let key in data) {
        if (data.hasOwnProperty(key))
          items.push(data[key]);
      }
      res = true;
      for (let i=0;i<items.length;i++) {
        if((items[i]['email'] == email) && (items[i]['type'] == 'docteur')) {
          res = false;
          break;
        }
      }
      if(res==false){
        const alert = await alertCtrl.create({ 
          message: "Vous n'êtes pas un patient", buttons: ['OK'] 
        });
        loading.dismiss();
        await alert.present();
      } else {
        localStorage.setItem('token', token);
        this.setAuthUserIdInStorage(token);
        this.carteGeoService.casPositifs();
        loading.dismiss();
        this.router.navigateByUrl('/welcome');
      }
    });
  }

}