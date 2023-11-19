import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { ItemCitaMedicoDTO } from 'src/app/modelo/medico/ItemCitaMedicoDTO';
import { MedicoService } from 'src/app/servicios/medico.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent {

  agenda: ItemCitaMedicoDTO[];
  auxiliarAgenda: ItemCitaMedicoDTO[];
  alerta!:Alerta

  constructor(private router: Router, private medicoService: MedicoService, private tokenService: TokenService){
    this.agenda = [];
    this.auxiliarAgenda = [];
    this.cargarAgenda();
  }

   public irAConsulta(item:ItemCitaMedicoDTO){

   }

  fechaSeleccionada: string = ''

  public cargarAgenda(){

    let codigoMedico = this.tokenService.getCodigo();

    console.log(codigoMedico)

    this.medicoService.listarCitasPendientes(codigoMedico).subscribe({
      next: data => {
        this.agenda = data.respuesta;
        this.auxiliarAgenda = Array.from(this.agenda)
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

  public filtrarTabla(event:any){
   
    if(this.fechaSeleccionada == ""){
      this.auxiliarAgenda = this.agenda;
    }else{
      this.auxiliarAgenda = this.agenda.filter( a => a.fecha == this.fechaSeleccionada );
    }
} 

}
