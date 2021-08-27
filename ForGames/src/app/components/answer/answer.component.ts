import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  @Input() answerContent?: string;
  @Input() answerCreation?: string;
  @Input() answerAuthor?: string;
  @Input() topicId?: number;
  constructor() { }

  ngOnInit(): void {
  }

}
