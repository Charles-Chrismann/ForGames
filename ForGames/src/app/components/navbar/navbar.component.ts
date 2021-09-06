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
    //this.selectAllGames();
    this.initForm();
  }

  onSelect(value: any){
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
      }
    )
  }

  OnSubmit(){
    const game = { name:this.gameForm.value.name }
    this.gameService.createGame(game).subscribe(
      (resp) => {
        this.router.navigate(['F/' + game.name])
        this.gameService.currentGame.next(game.name);
        this.OffFocus()
      }
    )
  }

  OnChange(event: any){
    this.focus = true
    const name = event.target.value
    this.gameService.searchGame(name).subscribe(
      (resp) => {
        this.results = resp
      }
    )
  }

  displayResult(arrResult:any) {
    return arrResult.name
  }

  OnFocus(){
    this.focus = true
  }
  
  OffFocus(){
    setTimeout(() => {
      this.focus = false
    }, 200);
    
  }

  authCheck(){
    return this.authService.isAuth()
  }

  logout(){
    localStorage.removeItem('TOKEN_APPLI')
  }
}
