import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AnswerService } from 'src/app/services/answer.service';
import { AuthService } from 'src/app/services/auth.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {
  gameName: any;
  topicId: any;
  answers?: any[];
  topic: any;
  answerForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private answerService: AnswerService,
    private topicService: TopicService,
    private authService : AuthService
  ) { 
    this.answerForm = new FormGroup({})
  }

  ngOnInit(): void {
    this.gameName = this.activatedRoute.snapshot.params['gameName'];
    this.topicId = this.activatedRoute.snapshot.params['topicId'];
    // this.answers = this.answerService.selectAnswersByTopicId(this.topicId)
    // console.log(this.answers)
    this.selectId(this.topicId)
    this.selectAnswers();
    this.initAnswerForm();
  }

  selectAnswers() {
    this.answerService.selectAnswersByTopicId(this.topicId).subscribe(
      (resp:any) => {
        this.answers = resp;
        console.log(resp);
        
      }
    )
  }

  selectId(topicId: any){
    this.topicService.selectTopicById(topicId).subscribe(
      (resp:any) => {
        this.topic = resp;
        console.log(resp);
        
      }
    )
  }

  initAnswerForm(){
    console.log("inited")
    this.answerForm = new FormGroup ({
     content: new FormControl('', [Validators.required])
    })
  }

  OnSubmit(){
    // console.log(this.loginForm.value);
    // //this.authService.create(this.loginForm.value);
    const answer = {
      content: this.answerForm.value.content,
      TopicId: this.topicId 
    }

    console.log(answer)
    this.answerService.sendAnswer(answer).subscribe();
    this.selectAnswers();
    this.initAnswerForm();
  }

  checkAuth(){
    return this.authService.isAuth()
  }

}
