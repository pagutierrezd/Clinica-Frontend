import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { ItemCitaDTO } from 'src/app/modelo/paciente/ItemCitaDTO';
import { FiltroCitaDTO } from 'src/app/modelo/paciente/FiltroCitaDTO';
import { ItemCitaPacienteDTO } from 'src/app/modelo/paciente/ItemCitaPacienteDTO';
import { ItemMedicoCitaDTO } from 'src/app/modelo/paciente/ItemMedicoCitaDTO';
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-pedir-cita',
  templateUrl: './pedir-cita.component.html',
  styleUrls: ['./pedir-cita.component.css']
})
export class PedirCitaComponent {

  alerta!: Alerta
  filtroCitaDTO: FiltroCitaDTO;
  citaDTO: ItemCitaDTO;
  citasPaciente: ItemCitaPacienteDTO[];
  auxiliarCitas: ItemCitaPacienteDTO[];
  fechaCitaSeleccionada: string = ''
  especialidades: string[]=[];
  listaMedicoCitaDTO: ItemMedicoCitaDTO[]=[];
  idMedico: number = 0
  hora: string = ""
  medicoSeleccionado:ItemMedicoCitaDTO ;
  hora2:string="";

  constructor(private clinicaService: ClinicaService, private pacienteService: PacienteService, private tokenService: TokenService) {
    this.filtroCitaDTO = new FiltroCitaDTO;
    this.citaDTO = new ItemCitaDTO;
    this.citasPaciente = [];
    this.auxiliarCitas = this.citasPaciente;
    this.cargarEspecialidades();
    this.mostrarCitasPaciente();
    this.medicoSeleccionado = new ItemMedicoCitaDTO;

  }

  public seleccionarFila(item: any) {
    this.idMedico = item.codigoMedico;
    this.hora = item.hora;
  }

  public buscarCitas() {

    this.pacienteService.filtrarMedicoCita(this.filtroCitaDTO).subscribe({
      next: data => {
        this.listaMedicoCitaDTO = data.respuesta;
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
        this.listaMedicoCitaDTO = []
      }
    });
  }

  public cargarEspecialidades() {
    this.clinicaService.listarEspecialidades().subscribe({
      next: data => {
        this.especialidades = data.respuesta;
        
      },
      error: error => {
        console.log(error);
      }
    });
  }

  public pedirCita() {

    let codigoPaciente = this.tokenService.getCodigo();
    this.citaDTO.idPaciente = codigoPaciente;
    this.citaDTO.idMedico = this.medicoSeleccionado.codigoMedico.valueOf();
    const fecha =  this.citaDTO.fechaCita +"T"+ this.medicoSeleccionado.horaDisponible;
    this.citaDTO.fechaCita =fecha;

    this.pacienteService.agendarCita(this.citaDTO).subscribe({
      next: data => {
        console.log(data.respuesta);
        console.log(data);
        this.alerta = { mensaje: data.respuesta, tipo: "success" };
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

  public mostrarCitasPaciente() {
    let codigoPaciente = this.tokenService.getCodigo();

    this.pacienteService.listarCitas(codigoPaciente).subscribe({
      next: data => {
        this.citasPaciente = data.respuesta;
        this.auxiliarCitas = Array.from(this.citasPaciente)
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

  seleccionarFechaCita(event: any) {
    let fecha = event.target.value;
    console.log(fecha)
    console.log(this.fechaCitaSeleccionada)
    if (this.fechaCitaSeleccionada == "") {
      this.auxiliarCitas = this.citasPaciente;
    } else {
      this.auxiliarCitas = this.citasPaciente.filter(c => c.fechaCita == this.fechaCitaSeleccionada);
    }
  }

}
