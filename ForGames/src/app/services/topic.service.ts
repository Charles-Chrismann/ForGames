import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  baseUrl = `${environment.apiUrl}`;

  topicSubject = new Subject<any>();
  gameName = this.route.snapshot.params['gameName'];


  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute
  ) { }


  selectAllTopicByGame(GameName: string){
    return this.httpClient.get<any>(this.baseUrl + '/game/' + GameName + '/topics');
  }

  postTopic(topic: any){
    return this.httpClient.post<any>(this.baseUrl + '/topic/create', topic)
  }

  selectAllTopic(){
    return this.httpClient.get<any>(this.baseUrl + '/topics');
  }

  selectTopicById(topicId: number){
    return this.httpClient.get<any>(this.baseUrl + '/topic/' + topicId);
  }
}
