import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { EpsDTO } from 'src/app/modelo/clinica/EpsDTO';
import { ActualizarPacienteDTO } from 'src/app/modelo/paciente/ActualizarPacienteDTO';
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { ImagenService } from 'src/app/servicios/imagen.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-gestion-info-personal',
  templateUrl: './gestion-info-personal.component.html',
  styleUrls: ['./gestion-info-personal.component.css']
})
export class GestionInfoPersonalComponent {

  ciudades: string[];
  tipo_sangre: string[];
  eps: EpsDTO[];
  archivos!: FileList;
  alerta!: Alerta
  datosPaciente: ActualizarPacienteDTO;

  pacienteActualizadoDTO: ActualizarPacienteDTO;
  constructor(private tokenService: TokenService, private pacienteService: PacienteService, private clinicaService: ClinicaService, private imagenService: ImagenService) {
    this.pacienteActualizadoDTO = new ActualizarPacienteDTO();
    this.datosPaciente = new ActualizarPacienteDTO();
    this.ciudades = [];
    this.eps = [];
    this.cargarCiudades();
    this.tipo_sangre = [];
    this.cargarTipoSangre();
    this.cargarEPS();
    this.obtenerDatosPaciente();
  }

  public obtenerDatosPaciente() {
    let codigoPaciente = this.tokenService.getCodigo();

    this.pacienteService.cargarDatosPaciente(codigoPaciente).subscribe({
      next: data => {
        this.datosPaciente = data.respuesta;
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });

  }

  public actualizar() {

    let codigoPaciente = this.tokenService.getCodigo();

    if (this.pacienteActualizadoDTO.foto.length != 0) {
      this.pacienteService.editarPerfil(codigoPaciente, this.pacienteActualizadoDTO).subscribe({
        next: data => {
          this.alerta = { mensaje: data.respuesta, tipo: "success" };
        },
        error: error => {
          this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
        }
      });
    } else {
      this.alerta = { mensaje: "Debe subir una imagen", tipo: "danger" };
    }
  }

  public eliminarCuenta() {

    let codigoPaciente = this.tokenService.getCodigo();

    this.pacienteService.eliminarCuenta(codigoPaciente).subscribe({
      next: data => {
        this.alerta = { mensaje: data.respuesta, tipo: "success" };
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });

  }

  private cargarCiudades() {
    this.clinicaService.listarCiudades().subscribe({
      next: data => {
        this.ciudades = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  private cargarEPS() {
    this.clinicaService.listarEPS().subscribe({
      next: data => {
        this.eps = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  private cargarTipoSangre() {
    this.clinicaService.listarTipoSangre().subscribe({
      next: data => {
        this.tipo_sangre = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.pacienteActualizadoDTO.foto = event.target.files[0].name;
      this.archivos = event.target.files;
    }
  }

  public subirImagen() {
    if (this.archivos != null && this.archivos.length > 0) {
      const formData = new FormData();
      formData.append('file', this.archivos[0]);
      this.imagenService.subir(formData).subscribe({
        next: data => {
          this.pacienteActualizadoDTO.foto = data.respuesta.url;

        },
        error: error => {
          this.alerta = { mensaje: error.error, tipo: "danger" };
        }
      });
    } else {
      this.alerta = { mensaje: 'Debe seleccionar una imagen y subirla', tipo: "danger" };
    }
  }
}
