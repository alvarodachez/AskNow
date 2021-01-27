import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManagmentComponent } from './components/managment/managment.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire'
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './components/login/login.component';
import { BarraNavegacionComponent } from './components/barra-navegacion/barra-navegacion.component';
import { CrearPreguntaComponent } from './components/crear-pregunta/crear-pregunta.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { ChatComponent } from './components/chat/chat.component';
import { ForoComponent } from './components/foro/foro.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PreguntaComponent } from './components/pregunta/pregunta.component';

@NgModule({
  declarations: [
    AppComponent,
    ManagmentComponent,
    LoginComponent,
    BarraNavegacionComponent,
    CrearPreguntaComponent,
    HomeComponent,
    ChatComponent,
    ForoComponent,
    PreguntaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    AngularFireAnalyticsModule,
    NgxPaginationModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
