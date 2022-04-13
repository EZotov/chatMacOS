import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../enteties/enteties';
import { Store } from '@ngrx/store';
import { loginUser } from '../store/app.actions';

interface AuthData {
  login : string,
  password : string
}

@Component(
  {
    selector : 'auth-component',
    templateUrl : './auth.component.html',
    styleUrls : ['./auth.component.scss']
  }
)

export class AuthComponent {

  errorMessageEnable : boolean = false;
  errorMessage : string = 'Неправильные данные. Проверьте ведённые значения. Должны быть латинские буквы и цифры';
  submitErrorMessage : string = 'Неверные логин и/или пароль';

  validData : AuthData = {
    login : 'user',
    password : 'user'
  };

   authSuccess : boolean;
   submitted : boolean;

  authForm : FormGroup = new FormGroup({
    login : new FormControl(null, [Validators.pattern(/^[A-z0-9]*$/), Validators.required]),
    password : new FormControl(null, [Validators.pattern(/^[A-z0-9]*$/), Validators.required])
  });

  loginUser : User = {
    userName : "user",
    name : "Default User",
    status : "Online",
    jobTitle : "Developer",
    mail : "default_user@gmail.com",
    skype : "def1123",
    timezone : "Local time",
    photo : "/assets/photos/default_user.png"
  }

  constructor(
    private router : Router,
    private store : Store
  ) {
    this.authSuccess = false;
    this.submitted = false;
  };

  onSubmitAuthForm() : void {
    this.submitted = true;
    if (this.authForm.status === 'VALID') {
      if (this.validData.login === this.authForm.controls['login'].value && this.validData.password === this.authForm.controls['password'].value) {
        this.store.dispatch(loginUser({loginUser : this.loginUser}));
        this.router.navigate(['/main']);
      }
      else {
        this.authSuccess = true;
      }
    }
  }
}
