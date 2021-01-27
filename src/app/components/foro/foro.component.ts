import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { PreguntaService } from '../../services/pregunta.service';
import { RespuestaService } from 'src/app/services/respuesta.service';
import { Pregunta } from 'src/app/interface/pregunta';
import { Respuesta } from 'src/app/interface/respuesta';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.css']
})
export class ForoComponent implements OnInit {

  startRes: Number;
  resLimit: Number;
  limitMostrarMenos:Number = 3;
  actualPage: number = 1;
  tableMode: boolean = false;
  respuestaTxt: string;
  preguntas: Pregunta[] = [];
  idSession: string;

  constructor(private usuarioService: UsuarioService, private preguntaService: PreguntaService, private respuestaService: RespuestaService) { 
    this.startRes = 0;
    this.resLimit = 1;
  }

  mostrarMasRespuestas(){
    this.resLimit = Number(this.resLimit) + 3;
  }

  mostrarMenosRespuestas(){
    this.resLimit = Number(this.resLimit) - 3;
  }

  ngOnInit(): void {
    this.getPreguntas();
    this.idSession = localStorage.getItem('sessionId');
  }

  getPreguntas() {
    this.preguntaService.getPreguntas().subscribe(data => {
      //console.log(data)
      this.preguntas = data;
    })
  }

  enviarRespuesta(pregunta: Pregunta) {
    this.respuestaService.crearRespuesta(pregunta, this.respuestaTxt);
    this.respuestaTxt = "";
  }

  darLike(pregunta: Pregunta, respuesta: Respuesta){
    

    let respuestaTemp:Respuesta = respuesta;

    let index = pregunta.respuestas.indexOf(respuestaTemp);

    pregunta.respuestas.splice(index,1);

    respuesta.meGusta = respuesta.meGusta + 1;

    pregunta.respuestas.push(respuesta);

    this.preguntaService.actualizarPregunta(pregunta).subscribe(data=>{
      console.log(data);
      this.getPreguntas();
    });


  }

}
