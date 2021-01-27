import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagmentComponent } from './components/managment/managment.component';
import { LoginComponent } from './components/login/login.component';
import { CrearPreguntaComponent } from './components/crear-pregunta/crear-pregunta.component';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { ForoComponent } from './components/foro/foro.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'managment', component: ManagmentComponent },
  { path: 'cu/:id', component: CrearPreguntaComponent },
  { path: 'home', component: HomeComponent},
  { path: 'chat', component:ChatComponent},
  { path: 'foro', component: ForoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
