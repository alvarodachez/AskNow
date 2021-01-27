import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private route: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('sessionId') !=null){

      this.route.navigate(['home'])
    }
  }

  ingresar(){
    this.usuarioService.login();
  }
}
