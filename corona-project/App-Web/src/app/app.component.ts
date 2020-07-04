import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  title: any;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(){
    if(localStorage.getItem('token')==null)
      this.router.navigateByUrl('/login');
  }

  isLogin(){
    if(localStorage.getItem('token')!=null)
      return true;
    else
      return false;
  }

  getAuthUserName(){
    return localStorage.getItem('name');
  }

  seDeconnecter(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
