import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  games: any;
  gameForm: FormGroup;
  currentGame: any;
  selectGame = 1;
  focus = false;
  results!: any[]

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private gameService: GameService,
    private router: Router
    ) {
      this.gameForm = new FormGroup({})
    }

  ngOnInit(): void {
    this.selectAllGames();
    this.initForm();
    // this.gameService.findOneGame('');
    
  }

  onSelect(value: any){
    console.log(value)
    this.selectGame = value;
    this.gameService.currentGame.next(value);
    
  }

  initForm() {
    this.gameForm = new FormGroup ({
      name: new FormControl('', [Validators.required])
    })
  }

  selectAllGames() {
    this.gameService.getAllGames().subscribe(
      (resp: any)=>{
        this.games = resp
        console.log(resp)
      }
    )
  }

  OnSubmit(){
    const game = { name:this.gameForm.value.name }
    this.gameService.createGame(game)
  }

  OnChange(event: any){
    
    // const name = { 
    //   name: event.target.value
    // }
    const name = event.target.value
    console.log(name)
    this.gameService.searchGame(name).subscribe(
      (resp) => {
        this.results = resp
        console.log(this.results)
      }
    )
  }

  displayResult(arrResult:any) {
    return arrResult.name
  }

  OnFocus(){
    console.log("ttt")
    this.focus = true
  }

  // onNavigate(name:string){
  //   this.router.navigate(['/F/' + name]);
  // }
  
  OffFocus(){
    setTimeout(() => {
      this.focus = false
    }, 200);
    
  }

  authCheck(){
    return this.authService.isAuth()
  }
}
