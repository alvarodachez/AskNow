import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pregunta } from '../interface/pregunta';
import { map, takeLast } from 'rxjs/operators';
import { Respuesta } from '../interface/respuesta';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  private url = 'https://asknow-dfc50-default-rtdb.europe-west1.firebasedatabase.app/';

  public usuario: any = {};

  constructor(private http: HttpClient, public auth: AngularFireAuth) {

    this.auth.authState.subscribe(user => {
      console.log('Estado del usuario: ', user);
      if (!user) {
        return;
      }

      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    })
  }

  crearPregunta(pregunta: Pregunta) {

    const respuesta: Respuesta = {}
    respuesta.respuesta = 'Buenas tardes';

    pregunta.respuestas.push(respuesta);
    pregunta.displayName = this.usuario.nombre;

    return this.http.post(this.url + 'preguntas.json', pregunta).pipe(
      map((resp: any) => {
        pregunta.id = resp.name;
        return pregunta;
      })
    );
  }

  actualizarPregunta(pregunta: Pregunta) {

    const preguntaTemp = {
      ...pregunta
    };

    delete preguntaTemp.id;

    return this.http.put(this.url + 'preguntas/' + pregunta.id + '.json', preguntaTemp);
  }

  getPreguntas() {
    return this.http.get(this.url + 'preguntas.json').pipe(
      map(resp => this.crearArray(resp))
    )
  }

  getPregntasUser() {
    return this.http.get(this.url + 'preguntas.json').pipe(
      map(resp => this.crearArrayUsuario(resp))
    )
  }

  getPreguntaById(id: string) {
    return this.http.get(this.url + 'preguntas/' + id + '.json')
  }

  borrarPregunta(id: string) {
    return this.http.delete(this.url + 'preguntas/' + id + '.json');
  }

  private crearArrayUsuario(preguntasObj: object) {

    const preguntas: Pregunta[] = [];

    if (preguntasObj == null) { return []; }

    Object.keys(preguntasObj).forEach(key => {

      const pregunta: Pregunta = preguntasObj[key];
      pregunta.id = key;

      if (pregunta.idUser == localStorage.getItem('sessionId')) {

        preguntas.push(pregunta);
      }

    })
    return preguntas;
  }

  private crearArray(preguntasObj: object) {

    const preguntas: Pregunta[] = [];

    if (preguntasObj == null) { return []; }

    Object.keys(preguntasObj).forEach(key => {

      const pregunta: Pregunta = preguntasObj[key];
      pregunta.id = key;

      pregunta.respuestas.sort((respuesta1:Respuesta,respuesta2:Respuesta)=>{
        if(respuesta1.meGusta < respuesta2.meGusta){
          return 1;
        }
    
        if(respuesta1.meGusta > respuesta2.meGusta){
          return -1;
        }
    
        return 0;
      })
      preguntas.push(pregunta);
    })

    return preguntas;
  }

  private ordenarRespuestas(respuesta1:Respuesta,respuesta2:Respuesta){

    if(respuesta1.meGusta < respuesta2.meGusta){
      return -1;
    }

    if(respuesta1.meGusta > respuesta2.meGusta){
      return 1;
    }

    return 0;
  }
}
