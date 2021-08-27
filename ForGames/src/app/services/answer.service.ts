import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  baseUrl = `${environment.apiUrl}`;
  gameName = this.route.snapshot.params['topicId'];

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute
  ) { }

  selectAnswersByTopicId(topicId: any){
    // console.log(this.baseUrl + '/answers/' + topicId)
    // console.log(this.httpClient.get<any>(this.baseUrl + '/answers/' + topicId).subscribe())
    return this.httpClient.get<any>(this.baseUrl + '/answers/' + topicId)
  }

  sendAnswer(answer: { content: string; TopicId: number; }){
    return this.httpClient.post<any>(this.baseUrl + '/answer/create', answer)
  }
}
