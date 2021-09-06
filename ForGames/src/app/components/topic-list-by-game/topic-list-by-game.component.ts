import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { element } from 'protractor';
import { Subscription } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-topic-list-by-game',
  templateUrl: './topic-list-by-game.component.html',
  styleUrls: ['./topic-list-by-game.component.scss']
})
export class TopicListByGameComponent implements OnInit, OnChanges {
  topics: any;
  gameName = this.activatedRoute.snapshot.params['gameName'];
  topicSub?: Subscription;
  currentGame: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private topicService: TopicService,
    private router: Router,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.gameName = this.activatedRoute.snapshot.params['gameName']
    this.gameService.findOneGame(this.gameName).subscribe(
      (resp) =>{
        this.topics = resp
      })
    this.gameService.currentGame.subscribe(
      (resp) =>{ 
        this.currentGame = resp    
        this.gameService.findOneGame(resp).subscribe(
          (resp) =>{
            this.topics = resp
          }
        )
      }
    )
  }

  ngOnChanges(): void {
    this.gameName = this.activatedRoute.snapshot.params['name']
    console.log(this.gameName)
    // setTimeout(() =>{this.selectTopicByGameId(this.gameName)}, 3000)
    this.gameService.currentGame.subscribe((resp) => {
      console.log(resp)
    })
    this.gameService.findOneGame(this.gameName);
  }


  // selectTopicByGameId(gameName: string) {
  //   console.log(gameName)
  //   this.topicService.selectAllTopicByGame(gameName).subscribe(
  //     (resp)=>{
  //       this.topics = resp;
  //     }
  //   )
  // }
}
