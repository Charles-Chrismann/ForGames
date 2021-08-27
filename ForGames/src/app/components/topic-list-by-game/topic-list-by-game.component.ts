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

  constructor(
    private activatedRoute: ActivatedRoute,
    private topicService: TopicService,
    private router: Router,
    private gameService: GameService
  ) {}
  //   let nbevent = 0;
  //   router.events.forEach((element) =>{
  //     console.log("tttttttttt")
  //     nbevent +=1
  //     console.log(nbevent)
  //   })
    
  //   if (nbevent == 3){
  //   router.events.subscribe(
      
  //     (event) => {
  //         if (event instanceof NavigationStart){
  //           if (event.url.split("/").length != 2){
  //             let Name = event.url.split("/")[2]
  //             this.selectTopicByGameId(Name);
  //           }
            
  //           //this.gameName = this.activatedRoute.snapshot.params['gameName'];
  //         }
          
          
  //         if (event instanceof NavigationEnd) {
  //           // end of loading paegs
  //         }
  //     });
  //   }
  //  }

  ngOnInit(): void {
    this.gameName = this.activatedRoute.snapshot.params['gameName']
    this.gameService.findOneGame(this.gameName).subscribe(
      (resp) =>{
        console.log(resp)
        this.topics = resp
      })
    console.log(this.gameName)
    this.gameService.currentGame.subscribe(
      (resp) =>{
        console.group("ttttttt")
        console.log(resp);
        
        this.gameService.findOneGame(resp).subscribe(
          (resp) =>{
            console.log(resp)
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
