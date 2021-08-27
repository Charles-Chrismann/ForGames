import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FourOhFourComponent } from './components/four-oh-four/four-oh-four.component';
import { PostComponent } from './components/post/post.component';
import { PostService } from './services/post.service';
import { TopicListByGameComponent } from './components/topic-list-by-game/topic-list-by-game.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { TopicComponent } from './components/topic/topic.component';
import { WriteComponent } from './components/write/write.component';
import { AnswersComponent } from './components/answers/answers.component';
import { AnswerComponent } from './components/answer/answer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    FourOhFourComponent,
    PostComponent,
    TopicListByGameComponent,
    TopicComponent,
    WriteComponent,
    AnswersComponent,
    AnswerComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
  ],
  providers: [
    AuthService,
    PostService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
