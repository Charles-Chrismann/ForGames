import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(
    private authService: AuthService,
    private router: Router
    ) {
    this.registerForm = new FormGroup({})
  }

  ngOnInit(): void {
    this.initRegisterForm();
  }

  initRegisterForm() {
    this.registerForm = new FormGroup({
    username: new FormControl('',[Validators.required, Validators.maxLength(16)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  
    // password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$')]),
    // confirmPassword: new FormControl('', Validators.required),
    //  //match: new FormControl('', Validators.arguments(MustMatch('password', 'confirmPassword')))
    }, 
    //  //validators: MustMatch('password', 'confirmPassword')
    );
  }

  //get f() { return this.registerForm.controls; }

    // this.submitted = true;
    // console.log(this.registerForm.value);
    // //this.authService.create(this.loginForm.value);

  OnSubmit(){
    const user = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }
    console.log(user)
    this.authService.register(user).subscribe();
  }
}
