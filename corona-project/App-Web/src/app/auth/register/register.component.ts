import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  userCreated: boolean;
  errorCreation: boolean;
  submit: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.userCreated = false;
    this.errorCreation = false;
  }

  form = new FormGroup({
    nom: new FormControl('', [
      Validators.required,
    ]),
    prenom: new FormControl('', [
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

  onSubmit() {
    this.submit = true;
    this.authService.register(this.form.value).subscribe(
      () => {
        setTimeout(() => { 
          this.submit = false;
          this.userCreated = true;
          setTimeout(() => { 
            this.router.navigateByUrl('/login');
          },1000);
        },1000);
      },
      () => {
        setTimeout(() => {
          this.errorCreation = true;
          this.submit = false;
        },1000);
      }
    );
  }
}