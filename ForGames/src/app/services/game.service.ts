import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  
  baseUrl = `${environment.apiUrl}`;
  currentGame: Subject<any> = new Subject()
  constructor(
    private httpClient: HttpClient,
  ) { }

  getAllGames(){
    return this.httpClient.get<any>(this.baseUrl + '/games')
  }

  findOneGame(name: string){
    return this.httpClient.get<any>(this.baseUrl + '/game/' + name + '/topics')
  }

  createGame(game:object){
    // console.log(this.baseUrl + '/games/create')
    return this.httpClient.post<any>(this.baseUrl + '/game/create', game)
  }

  // searchGame(name: any) {
  //   //throw new Error('Method not implemented.');
  //   console.log(this.baseUrl + '/games/search')
  //   console.log(name)
  //   return this.httpClient.get<any>(this.baseUrl + '/games/search', name)
  // }

  searchGame(name: any) {
    return this.httpClient.get<any>(this.baseUrl + '/games/search/' + name)
  }
}
