import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class WriteComponent implements OnInit {
  topicForm: FormGroup;
  gameName = this.activatedRoute.snapshot.params['gameName']

  constructor(
    private activatedRoute: ActivatedRoute,
    private router : Router,
    private topicService: TopicService
  ) {
    this.topicForm = new FormGroup({})
   }

  ngOnInit(): void {
    this.initTopicForm();
  }

  initTopicForm() {
    this.topicForm = new FormGroup({
    title: new FormControl('',[Validators.required]),
    content: new FormControl('', [Validators.required]),
    gameId: new FormControl('', [Validators.required]),
    })
  }

  OnSubmit(){
    const topic = {
      title: this.topicForm.value.title,
      content: this.topicForm.value.content,
      GameName: this.gameName,
    }
    console.log(topic)
    this.topicService.postTopic(topic).subscribe((resp) => {
      this.router.navigate(['F/' + this.gameName]);
    })
  }
}
