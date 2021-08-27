import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  topics?: any[];
  posts?: any[];

  // @Input() topicTitle?: string;
  // @Input() topicContent?: string;
  // @Input() topicCreation?: string;
  // @Input() topicAuthor?: string;
  // @Input() gameName?: string;
  // @Input() homeStatus?: boolean;

  constructor(
    private topicService: TopicService
    ) { }

  ngOnInit(): void {
    //this.posts = this.topicService.posts;
    this.selectTopics();
  }

  selectTopics() {
  this.topicService.selectAllTopic().subscribe(
    (resp: any)=>{      
      this.topics = resp;
      console.log(resp)
    }
    
  )
}
}

