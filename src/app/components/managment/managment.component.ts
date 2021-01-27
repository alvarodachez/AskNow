import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pregunta } from 'src/app/interface/pregunta';
import Swal from 'sweetalert2';
import { PreguntaService } from '../../services/pregunta.service';

@Component({
  selector: 'app-managment',
  templateUrl: './managment.component.html',
  styleUrls: ['./managment.component.css']
})
export class ManagmentComponent implements OnInit {


  actualPage: number = 1;
  preguntas: Pregunta[];

  constructor(private router: Router, private preguntaService: PreguntaService) { }

  ngOnInit(): void {

    this.getPreguntas();
  }

  getPreguntas() {
    this.preguntaService.getPregntasUser().subscribe(data => {
      console.log(data);
      this.preguntas = data;
    })
  }
  irCrearPregunta(idPregunta?: string) {

    if (idPregunta) {
      this.router.navigate(['cu/nuevo'])
    } else {
      this.router.navigate(['cu/' + idPregunta]);
    }
  }

  borrarPregunta(pregunta: Pregunta) {

    Swal.fire({
      title: '¿Está seguro?',
      text: 'Esta seguro que desea borrar la pregunta, ' + pregunta.titulo,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(r => {

      if (r.value) {

        this.preguntaService.borrarPregunta(pregunta.id).subscribe( data => {
          this.getPreguntas();
        });

      }
    })
  }

}
