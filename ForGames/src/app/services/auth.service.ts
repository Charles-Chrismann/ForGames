import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = `${environment.apiUrl}`;

  // messageActivate: string = "Veuillez cliquer sur le lien pour activer votre compte !";
  // messageNotMatch: string = "Adresse mail ou mot de passe erroné."
  // private currentUserSubject: BehaviorSubject<User>;
  // public currentUser: Observable<User>;


  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  register(newUser: User) {
    return this.httpClient.post<any>(this.baseUrl + '/auth/register', newUser)
      .pipe(
        map(
        (response) => {
          if(response.token) {
            localStorage.setItem('TOKEN_APPLI', response.token)
            this.router.navigate([''])
          }
        }
      )
    )
  }

  login(body: any) {
    return this.httpClient.post<any>(this.baseUrl + '/auth/login', body)
    .pipe(
      map(
      (response) => {
        if(response.token) {
          localStorage.setItem('TOKEN_APPLI', response.token)
          this.router.navigate([''])
        }
        
        console.log('Token : ' + response.token)
        console.log(response)
      }
    )
  )
  }

  isAuth(){
    if(localStorage.getItem("TOKEN_APPLI")){
      return true
    } else {
      return false
    }
  }
}
