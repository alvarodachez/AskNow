import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css']
})
export class BarraNavegacionComponent implements OnInit {

  online:boolean = false;

  public usuario: any = {};

  constructor(private usuarioService:UsuarioService, private route: Router, public auth: AngularFireAuth) {

    this.auth.authState.subscribe(user => {
      console.log('Estado del usuario: ', user);
      if (!user) {
        return;
      }

      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
      this.usuario.photoURL = user.photoURL;
    })
  }

  ngOnInit(): void {

    if(localStorage.getItem('sessionId')!=null){
      this.online = true;
    }
  }

  logout(){
    this.usuarioService.logout();
  }

}
