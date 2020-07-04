import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { InvestigationService } from 'src/app/investigation/investigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  
  submit: boolean;
  alert: boolean;

  alertIt(){
    this.alert = true;
    this.submit = false; 
  }

  constructor(
    private authService: AuthService,
    private investigationService: InvestigationService
  ) { }

  ngOnInit(){
    this.form.reset();
    this.authService.alertObservable.subscribe((res) => {
      this.alertIt();
    });
    this.submit = false;
    this.alert = false;
  }

  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
  });

  onSubmit() {
    this.submit = true;
    this.authService.login(this.form.value).subscribe (
      token => {
        setTimeout(() => {
          this.investigationService.investigations();
          this.authService.isDocteur(token,this.form.value['email']);
        },1000);
      },
      () => {
        setTimeout(() => { 
          this.alertIt();
        },1000);
      }
    );
  }
}