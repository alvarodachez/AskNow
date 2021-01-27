import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public usuario: any = {};
  constructor(public auth: AngularFireAuth, private router:Router) {

    this.auth.authState.subscribe(user => {
      console.log('Estado del usuario: ', user);
      if (!user) {
        return;
      }

      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    })
  }

  ngOnInit(): void {
  }

  irAdministracion(){
    this.router.navigate(['managment'])
  }

  irChatear(){
    this.router.navigate(['chat'])
  }

  irForo(){
    this.router.navigate(['foro'])
  }

}
