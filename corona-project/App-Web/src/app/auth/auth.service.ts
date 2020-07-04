import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private url = 'http://127.0.0.1:8000/api';
  private alertSubject = new Subject<any>();
  alertObservable = this.alertSubject.asObservable();

  callAlert() {
    this.alertSubject.next();
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  register(user: any) {
    return this.http.post(`${this.url}/registerDocteur`, user);
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
    this.http.get(`${this.url}/allDocteurs`).toPromise().then(data => {
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
      });
    }
  }

  isDocteur(token: string, email: string){
    var items = [];
    var res: boolean;
    this.http.get(`${this.url}/allUsers`).toPromise().then(data => {
      for (let key in data) {
        if (data.hasOwnProperty(key))
          items.push(data[key]);
      }
      res = true;
      for (let i=0;i<items.length;i++) {
        if((items[i]['email'] == email) && (items[i]['type'] == 'patient')) {
          res = false;
          break;
        }
      }
      if(res==false){
        this.callAlert();
      }
      else {
        localStorage.setItem('token', token);
        this.setAuthUserIdInStorage(token);
        this.router.navigateByUrl('/tableau-de-bord');
      }
    });
  }

}