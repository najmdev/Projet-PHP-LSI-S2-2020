import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarteGeoService {

  private url = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  casPositifs() {
    var villes=[];
    var positifsVilles=[];
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
      localStorage.setItem('positifsVilles',JSON.stringify(positifsVilles));
    });
  }

  majCasPositifs() {
    var villes=[];
    var positifsAfter=[];
    this.http.get(`${this.url}/totalVilles`).toPromise().then(data => {
      for (let key in data) {
        if (data.hasOwnProperty(key)){
          villes.push(data[key]);
        }
      }
      for (let i=0; i<villes.length; i++) {
        if(villes[i][1] == undefined)
          positifsAfter.push(villes[i][0]['nbr']);
        else
          positifsAfter.push(villes[i][1]['nbr']);
      }
      localStorage.setItem('positifsAfter',JSON.stringify(positifsAfter));
    });
  }


}