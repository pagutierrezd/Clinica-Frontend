import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { ItemConsultaMedicoPacienteDTO } from 'src/app/modelo/medico/ItemConsultaMedicoPacienteDTO';
import { MedicoService } from 'src/app/servicios/medico.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-historico-consultas',
  templateUrl: './historico-consultas.component.html',
  styleUrls: ['./historico-consultas.component.css']
})
export class HistoricoConsultasComponent {


  fechaSeleccionada: string = ""
  consultas: ItemConsultaMedicoPacienteDTO[];
  auxiliarConsultas: ItemConsultaMedicoPacienteDTO[];
  alerta!: Alerta

  constructor(private medicoService: MedicoService, private tokenService: TokenService) {
    this.consultas = []
    this.auxiliarConsultas = []
    this.cargarHistorialConsultas();
  }


  seleccionarFecha(event: any) {
    let fecha = event.target.value;
    console.log(fecha)
    console.log(this.fechaSeleccionada)
    if (this.fechaSeleccionada == "") {
      this.auxiliarConsultas = this.consultas;
    } else {
      this.auxiliarConsultas = this.consultas.filter(c => c.fecha == this.fechaSeleccionada);
    }

  }


  public cargarHistorialConsultas() {

    let codigoMedico = this.tokenService.getCodigo();

    this.medicoService.listarCitasRealizadasMedico(codigoMedico).subscribe({
      next: data => {
        this.consultas = data.respuesta;
        this.auxiliarConsultas = Array.from(this.consultas)
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

}
