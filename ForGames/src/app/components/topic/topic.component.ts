import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {

  @Input() topicTitle?: string;
  @Input() topicContent?: string;
  @Input() topicCreation?: string;
  @Input() topicAuthor?: string;
  @Input() gameName?: string;
  @Input() topicId?: string;
  @Input() homeStatus?: boolean;
  @Input() status?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
