import { Component, OnInit } from '@angular/core';
import { Pregunta } from '../../interface/pregunta';
import { NgForm } from '@angular/forms';
import { Respuesta } from '../../interface/respuesta';
import { PreguntaService } from '../../services/pregunta.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-crear-pregunta',
  templateUrl: './crear-pregunta.component.html',
  styleUrls: ['./crear-pregunta.component.css']
})
export class CrearPreguntaComponent implements OnInit {


  pregunta: Pregunta = {};

  constructor(private preguntaService: PreguntaService, private route: ActivatedRoute) {


  }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if(id != 'nuevo'){
      this.preguntaService.getPreguntaById(id).subscribe( (resp:Pregunta) =>{

        this.pregunta = resp;
        this.pregunta.id = id;
      });
    }
  }
  

  guardar(form: NgForm) {

    if (form.invalid) {
      console.log('Formulario invalido')
    } else {

      Swal.fire({
        title: 'Espere',
        text: 'Guardando pregunta',
        icon: 'info',
        allowOutsideClick: false

      });
      Swal.showLoading();

      let peticion: Observable<any>;

      if (this.pregunta.id) {
        this.pregunta.respuestas = new Array();
        peticion = this.preguntaService.actualizarPregunta(this.pregunta);
      } else {
        this.pregunta.idUser = localStorage.getItem('sessionId');
        this.pregunta.respuestas = new Array();
        peticion = this.preguntaService.crearPregunta(this.pregunta);
      }

      peticion.subscribe(resp =>{

        this.pregunta = resp;
        Swal.fire({
          title: this.pregunta.titulo,
          text:'Operacion realizada correctamente.',
          icon:'success'
        });
      })

    }




  }

}
