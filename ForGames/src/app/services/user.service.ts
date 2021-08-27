import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = `${environment.apiUrl}`;
  constructor(
    private httpClient: HttpClient,
  ) { }

  updateUser(user: any){
    return this.httpClient.put<any>(this.baseUrl + '/user/update', user)
  }

  getUser(){
    return this.httpClient.get<any>(this.baseUrl + '/user');
  }
}
