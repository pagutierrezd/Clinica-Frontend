import { Component } from '@angular/core';

@Component({
  selector: 'app-historial-consultas',
  templateUrl: './historial-consultas.component.html',
  styleUrls: ['./historial-consultas.component.css']
})
export class HistorialConsultasComponent {
  fechaSeleccionada: string = ''
 
  seleccionarFecha(event:any) {
    console.log('Fecha seleccionada:', this.fechaSeleccionada);  
  }

  textoIngresado: string = '';

  imprimirEnConsola() {
    console.log('Texto ingresado:', this.textoIngresado);
  }

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const valor = inputElement.value;
    console.log('Texto actual en el input:', valor);
  }
}