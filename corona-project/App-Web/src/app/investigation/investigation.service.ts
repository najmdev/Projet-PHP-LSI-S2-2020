import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class InvestigationService {

  private url = 'http://127.0.0.1:8000/api';
  private refreshNeeded = new Subject<void>();

  constructor(
    private http: HttpClient,
  ) { }

  get refreshNeed() {
    return this.refreshNeeded;
  }

  getInvestigationsNonTraite(): Observable<[]> {
    return this.http.get<[]>(`${this.url}/investigationsNonTraite`);
  }

  getInvestigationsTraite(): Observable<[]> {
    return this.http.get<[]>(`${this.url}/investigationsTraite`);
  }

  investigations() {
    var casNT:number = 0;
    var casP:number = 0;
    var casN:number = 0;
    var dates=[];
    var villes=[];
    var positifsVilles=[];
    var now = new DatePipe('en-US').transform(Date.now(),'yyyy-MM-dd');

    this.http.get(`${this.url}/investigationsNonTraite`).toPromise().then(data => {
      for (let key in data) {
        if (data.hasOwnProperty(key))
          casNT++;
      }
      localStorage.setItem('nbrNT',''+casNT);
    });  

    this.http.get(`${this.url}/investigationsTraite`).toPromise().then(data => {
      for (let key in data) {
        if (data.hasOwnProperty(key)){
          if(data[key]['traite']==true)
            casP++;
          else
            casN++;
        }
      }
      localStorage.setItem('nbrP',''+casP);
      localStorage.setItem('nbrN',''+casN);
    });

    this.http.get(`${this.url}/totalDates/${now}`).toPromise().then(data =>{
      for (let key in data) {
        if (data.hasOwnProperty(key)){
          dates.push(data[key]);
        }
      }
      localStorage.setItem('totalDates',JSON.stringify(dates));
    });

    this.http.get(`${this.url}/totalVilles`).toPromise().then(data => {
      for (let key in data) {
        if (data.hasOwnProperty(key)){
          villes.push(data[key]);
        }
      }
      for (let i=0; i<villes.length; i++) {
        if(villes[i][1] == undefined)
          positifsVilles.push(villes[i][0]['nbr']);
        else
          positifsVilles.push(villes[i][1]['nbr']);
      }
      localStorage.setItem('totalVilles',JSON.stringify(villes));
      localStorage.setItem('positifsVilles',JSON.stringify(positifsVilles));
    });

    let total :number = parseInt(localStorage.getItem('nbrP'))+
    parseInt(localStorage.getItem('nbrN'))+parseInt(localStorage.getItem('nbrNT'));
    localStorage.setItem('totalBefore', String(total));
  }

  updateInvestigation(id: any,resultat: any) {
    return this.http.put(`${this.url}/updateInvestigation/${id}`,resultat, {
      headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}
    });
  }

  verifierInvestigations() {
    var items=[];
    this.http.get(`${this.url}/allInvestigations`).toPromise().then(data => {
      for (let key in data) {
        if (data.hasOwnProperty(key)){
          items.push(data[key]);
        }
      }
      localStorage.setItem('totalAfter',''+items.length);
    });
  }

}