import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { BusquedaConsultaDTO } from 'src/app/modelo/paciente/BusquedaConsultaDTO';
import { ItemConsultaPacienteDTO } from 'src/app/modelo/paciente/ItemConsultaPacienteDTO';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-consultas-paciente',
  templateUrl: './consultas-paciente.component.html',
  styleUrls: ['./consultas-paciente.component.css']
})
export class ConsultasPacienteComponent {

  busquedaConsulta: BusquedaConsultaDTO;
  consultasPaciente: ItemConsultaPacienteDTO[];
  alerta!: Alerta

  constructor(private pacienteService: PacienteService, private tokenService: TokenService) {
    this.consultasPaciente = [];
    this.busquedaConsulta = new BusquedaConsultaDTO;
    this.cargarConsultasPaciente();

  }

  public buscarConsultas() {

    let codigo = this.tokenService.getCodigo();

    this.busquedaConsulta.idPaciente = codigo;

    this.pacienteService.buscarConsulta(this.busquedaConsulta).subscribe({
      next: data => {
        this.consultasPaciente = data.respuesta;
      },
      error: error => {
        console.log("no sirvio")
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });

  }

  public cargarConsultasPaciente() {

    let codigo = this.tokenService.getCodigo();

    this.pacienteService.listarConsultasPaciente(codigo).subscribe({
      next: data => {
        this.consultasPaciente = data.respuesta;
      },
      error: error => {
        this.alerta = { mensaje: error.error, tipo: "danger" };
      }
    });
  }

}
