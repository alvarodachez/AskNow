import { Injectable } from '@angular/core';
import { PreguntaService } from './pregunta.service';
import { map } from 'rxjs/operators';
import { Pregunta } from '../interface/pregunta';
import { Respuesta } from '../interface/respuesta';
import { User } from '../interface/usuario';
import { UsuarioService } from './usuario.service';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {

  private url = 'https://asknow-dfc50-default-rtdb.europe-west1.firebasedatabase.app/';

  public usuario: any = {};

  pregunta: Pregunta = {};

  respuesta: Respuesta = {};

  constructor(private http: HttpClient, private preguntaService: PreguntaService, private usuarioService: UsuarioService, public auth: AngularFireAuth) { 
    this.auth.authState.subscribe(user => {
      console.log('Estado del usuario: ', user);
      if (!user) {
        return;
      }

      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    })
  }

  crearRespuesta(pregunta: Pregunta, respuestaTxt: string) {


    this.respuesta.idPregunta = pregunta.id;
    this.respuesta.idUsuario = this.usuario.uid;
    this.respuesta.displayName = this.usuario.nombre;
    this.respuesta.respuesta = respuestaTxt;
    this.respuesta.meGusta = 0;
    
    console.log(this.respuesta);

    pregunta.respuestas.push(this.respuesta);

    for (let res of pregunta.respuestas){
      if(res.respuesta == 'Buenas tardes'){
        pregunta.respuestas.splice(0,1);
      }
    }

    console.log(pregunta);

    this.preguntaService.actualizarPregunta(pregunta).subscribe(data=>{
      console.log(data);
    });

    
  }
}
