import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService, 
              private router: Router) {
    this.loginForm = new FormGroup({})
  }

  ngOnInit(): void {
  this.initForm();
  }

  initForm(){
    this.loginForm = new FormGroup ({
     email: new FormControl('', [Validators.required, Validators.email]),
     password: new FormControl('', Validators.required)
    })
  }

  OnSubmit(){
    // console.log(this.loginForm.value);
    // //this.authService.create(this.loginForm.value);
    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    console.log(user)
    this.authService.login(user).subscribe();
  }
}
