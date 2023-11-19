import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { ItemPqrDTO } from 'src/app/modelo/clinica/ItemPqrDTO';
import { MensajeDTO } from 'src/app/modelo/clinica/MensajeDTO';
import { ItemCitaPqrsPaciente } from 'src/app/modelo/paciente/ItemCitaPqrsPacienteDTO';
import { RegistroPqrDTO } from 'src/app/modelo/paciente/RegistroPqrDTO';
import { RespuestaPacientePqrsDTO } from 'src/app/modelo/paciente/RespuestaPacientePqrsDTO';
import { CitaService } from 'src/app/servicios/cita.service';
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { PqrsService } from 'src/app/servicios/pqrs.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-pqrs-paciente',
  templateUrl: './pqrs-paciente.component.html',
  styleUrls: ['./pqrs-paciente.component.css']
})
export class PqrsPacienteComponent {

  estadoSeleccionado: string = ''

  pqrsPacienteDTO: RegistroPqrDTO;
  pqrs: ItemPqrDTO[];
  auxiliarPqrs: ItemPqrDTO[];
  alerta!: Alerta;
  selectedCheckboxCount: number = 0;
  cita: ItemCitaPqrsPaciente[];
  auxiliarCitas: ItemCitaPqrsPaciente[];
  estadosPqrs: string[]
  mensajesDTO: MensajeDTO[];
  respuestaPaciente: RespuestaPacientePqrsDTO;
  detalle: string = '';
  codigoPqrs: number = 0

  constructor(private pqrsService: PqrsService, private citaService: CitaService, private pacienteService: PacienteService, private tokenService: TokenService, private clinicaService: ClinicaService) {
    this.pqrsPacienteDTO = new RegistroPqrDTO();
    this.respuestaPaciente = new RespuestaPacientePqrsDTO;
    this.cita = []
    this.auxiliarCitas = [];
    this.pqrs = [];
    this.auxiliarPqrs = []
    this.estadosPqrs = [];
    this.mensajesDTO = [];
    this.cargarPqrsPaciente();
    this.cargarCitasPaciente();
    this.cargarEstadosPQRS();

  }

  public seleccionarFila(item: any) {
    this.mensajesDTO = []
    this.codigoPqrs = item.codigoRadicacion;
    this.obtenerMensajesPqrs();
  }

  public cargarCitasPaciente() {
    let codigo = this.tokenService.getCodigo();

    this.pacienteService.listarCitasPqrs(codigo).subscribe({
      next: data => {
        this.cita = data.respuesta;
        this.auxiliarCitas = Array.from(this.cita)
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

  public cargarEstadosPQRS() {
    this.clinicaService.listarEstadosPqrs().subscribe({
      next: data => {
        this.estadosPqrs = data.respuesta;
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

  public cargarPqrsPaciente() {

    let codigo = this.tokenService.getCodigo();

    this.pacienteService.listarPQRSPaciente(codigo).subscribe({
      next: data => {
        this.pqrs = data.respuesta;
        this.auxiliarPqrs = Array.from(this.pqrs);
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

  public obtenerMensajesPqrs() {
    let codigoPqrs = this.codigoPqrs;
    this.pacienteService.mostrarHistorialMensajesPqrs(codigoPqrs).subscribe({
      next: data => {
        this.mensajesDTO = data.respuesta;
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

  public crearPqrs() {

    this.pacienteService.crearPQRS(this.pqrsPacienteDTO).subscribe({
      next: data => {
        this.alerta = { mensaje: data.respuesta, tipo: "success" };
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }
  public seleccionar(codigoCita: number) {
    this.pqrsPacienteDTO.codigoCita = codigoCita;
  }

  onCheckboxChange(event: any) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    this.selectedCheckboxCount = checkboxes.length;

    if (this.selectedCheckboxCount > 1) {
      event.target.checked = false;
    }

  }

  public seleccionarFecha(event: any) {
    let fecha = event.target.value;
    if (fecha == "") {
      this.auxiliarCitas = this.cita;
    } else {
      this.auxiliarCitas = this.cita.filter(c => c.fecha == fecha);
    }
  }


  isButtonDisabled() {
    return this.detalle.trim() === '' || this.selectedCheckboxCount !== 1;
  }

  seleccionarEstado() {
    console.log("Estado seleccionado: " + this.estadoSeleccionado)
  }


  public filtrarTabla(event: any) {
    let estadoSelecionado = event.target.value;
    console.log(this.auxiliarPqrs.length)
    if (estadoSelecionado == "") {
      this.auxiliarPqrs = this.pqrs;
    } else {
      this.auxiliarPqrs = this.pqrs.filter(p => p.estadoPqrs == estadoSelecionado);
    }

  }

  public enviarRespuesta() {

    let codigoPaciente = this.tokenService.getCodigo();

    this.respuestaPaciente.codigoPqrs = this.codigoPqrs;
    this.respuestaPaciente.codigoPaciente = codigoPaciente;


    for (let i = this.mensajesDTO.length - 1; i >= 0; i--) {
      const mensaje: MensajeDTO = this.mensajesDTO[i];
      if (mensaje.nombreUsuario.includes('@')) {
        console.log(mensaje);
        this.respuestaPaciente.respuestaAdmin = mensaje.codigo;
        break
      }

    }

    this.pacienteService.responderPqrs(this.respuestaPaciente).subscribe({
      next: data => {
        this.alerta = { mensaje: data.respuesta, tipo: "success" };
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }


}
