import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/otros/MensajeDTO';
import { ActualizarPacienteDTO } from '../modelo/paciente/ActualizarPacienteDTO';
import { RegistroPqrDTO } from '../modelo/paciente/RegistroPqrDTO';
import { RespuestaPacientePqrsDTO } from '../modelo/paciente/RespuestaPacientePqrsDTO';
import { ItemCitaDTO } from '../modelo/paciente/ItemCitaDTO';
import { FiltroCitaDTO } from '../modelo/paciente/FiltroCitaDTO';
import { BusquedaConsultaDTO } from '../modelo/paciente/BusquedaConsultaDTO';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private userUrl = "http://localhost:8081/api/pacientes";
  constructor(private http: HttpClient) { }

  public editarPerfil(codigoPaciente: number, pacienteDTO: ActualizarPacienteDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.userUrl}/editar-perfil/${codigoPaciente}`, pacienteDTO);
  }

  public eliminarCuenta(codigo: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.userUrl}/eliminar/${codigo}`);
  }

  public cargarDatosPaciente(codigo: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/datos-paciente/${codigo}`);
  }

  public agendarCita(citaDTO: ItemCitaDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userUrl}/agendar-cita`, citaDTO);
  }

  public crearPQRS(pqrsPacienteDTO: RegistroPqrDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userUrl}/crear-pqrs`, pqrsPacienteDTO);
  }

  public listarPQRSPaciente(codigoPaciente: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/listar-pqrs/${codigoPaciente}`);
  }

  public responderPqrs(respuestaPqrsDTO: RespuestaPacientePqrsDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userUrl}/responder-pqrs`, respuestaPqrsDTO);
  }

  public listarCitas(codigoPaciente: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/listar-citas/${codigoPaciente}`);
  }

  public listarCitasPqrs(idPaciente: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/listar-citas-pqrs/${idPaciente}`);
  }

  public buscarConsulta(busquedaConsultaDTO: BusquedaConsultaDTO): Observable<MensajeDTO> {
    //return this.http.request<MensajeDTO>('get', `${this.userUrl}/buscar-consulta`, { body: busquedaConsultaDTO});
    return this.http.post<MensajeDTO>(`${this.userUrl}/buscar-consulta`, busquedaConsultaDTO);
  }

  public listarConsultasPaciente(codigoPaciente: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/listar-consultas-paciente/${codigoPaciente}`);
    
  }

  public filtrarMedicoCita(filtroCitaDTO: FiltroCitaDTO): Observable<MensajeDTO> {
    //return this.http.request<MensajeDTO>('get', `${this.userUrl}/filtrar-medico-cita`, { body: filtroCitaDTO});
    return this.http.post<MensajeDTO>(`${this.userUrl}/filtrar-medico-cita`, filtroCitaDTO);
  }

  public mostrarHistorialMensajesPqrs(codigoPqrs: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/historial-mensajes-pqrs/${codigoPqrs}`);
  }

  public cambiarPassword(correo:string):Observable<MensajeDTO>{
    return this.http.get<MensajeDTO>(`${this.userUrl}?correo=${correo}`);
  }
}