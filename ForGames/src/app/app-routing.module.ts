import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswersComponent } from './components/answers/answers.component';
import { FourOhFourComponent } from './components/four-oh-four/four-oh-four.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { TopicListByGameComponent } from './components/topic-list-by-game/topic-list-by-game.component'
import { WriteComponent } from './components/write/write.component';

const routes: Routes = [
  
  {path: 'F/:gameName', component: TopicListByGameComponent},
  {path: 'F/:gameName/write-topic', component: WriteComponent},
  {path: 'F/:gameName/:topicId', component: AnswersComponent},

  //{path: 'home', component: HomeComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  { path: 'F', component: HomeComponent },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
