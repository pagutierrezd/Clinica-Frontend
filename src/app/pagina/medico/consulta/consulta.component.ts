import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { AtencionMedicoDTO } from 'src/app/modelo/medico/AtencionMedicaDTO';
import { ItemCitaMedicoDTO } from 'src/app/modelo/medico/ItemCitaMedicoDTO';
import { ItemConsultaMedicoPacienteDTO } from 'src/app/modelo/medico/ItemConsultaMedicoPacienteDTO';
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { MedicoService } from 'src/app/servicios/medico.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent {

  fechaSeleccionada: string = ""
  alerta!: Alerta
  atencionDTO: AtencionMedicoDTO;
  itemCitaMedico: ItemCitaMedicoDTO;
  consultasPaciente: ItemConsultaMedicoPacienteDTO[];
  auxiliarConsultasPaciente: ItemConsultaMedicoPacienteDTO[];
  medicamentos: string[]

  constructor(private route: ActivatedRoute, private router: Router, private medicoService: MedicoService, private tokenService: TokenService, private clinicaService: ClinicaService) {
    this.atencionDTO = new AtencionMedicoDTO;
    this.itemCitaMedico = new ItemCitaMedicoDTO;
    this.consultasPaciente = []
    this.auxiliarConsultasPaciente = []
    this.medicamentos = []
    this.cargarConsultasPaciente();
  }

  public cargarConsultasPaciente() {

    let codigoPaciente = 0;

    this.medicoService.listarCitaPaciente(codigoPaciente).subscribe({
      next: data => {
        this.consultasPaciente = data.respuesta;
        this.auxiliarConsultasPaciente = Array.from(this.consultasPaciente)
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

  public guardarHistoria() {

    let idCita = 0;

    this.atencionDTO.idCita = idCita;

    this.medicoService.atenderCita(this.atencionDTO).subscribe({
      next: data => {
        this.alerta = { mensaje: data.respuesta, tipo: "success" };
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });

  }

  seleccionarFechaConsulta(event: any) {
    let fecha = event.target.value;
    console.log(fecha)
    console.log(this.fechaSeleccionada)
    if (this.fechaSeleccionada == "") {
      this.auxiliarConsultasPaciente = this.consultasPaciente;
    } else {
      this.auxiliarConsultasPaciente = this.consultasPaciente.filter(c => c.fecha == this.fechaSeleccionada);
    }
  }
}
