import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  //PostsSubject = new Subject<any[]>();

  posts = [
    {
      id: 1,
      date: "01 jan 1999 09:21",
      author: "user_a",
      title: "title a",
      content: "lorem ipsum bref on a compris c'est le contenu du post 1",
      answers: [
        {
          answer_id: 1_1,
          date: "01 jan 1999 09:26",
          author: "user_answer_a",
          content: "lorem ipsum bref on a compris c'est la rep du post 1",
        }
      ]
    },{
      id: 1,
      date: "01 jan 1999 09:21",
      author: "user_b",
      title: "title b",
      content: "lorem ipsum bref on a compris c'est le contenu du post 2",
      answers: [
        {
          answer_id: 1_1,
          date: "01 jan 1999 09:26",
          author: "user_answer_b",
          content: "lorem ipsum bref on a compris c'est le contenu du post 2",
        }
      ]
    },{
      id: 1,
      date: "01 jan 1999 09:21",
      author: "user_c",
      title: "title c",
      content: "lorem ipsum bref on a compris c'est le contenu du post 3",
      answers: [
        {
          answer_id: 1_1,
          date: "01 jan 1999 09:26",
          author: "user_answer_c",
          content: "lorem ipsum bref on a compris c'est le contenu du post 3",
        }
      ]
    },
  ];

  postService: any;

  constructor() { }
}
