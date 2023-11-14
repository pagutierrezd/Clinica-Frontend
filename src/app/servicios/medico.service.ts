import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../modelo/otros/MensajeDTO';
import { Observable } from 'rxjs';
import { AtencionMedicoDTO } from '../modelo/medico/AtencionMedicaDTO';
import { DiaLibreDTO } from '../modelo/medico/AgendarDiaLibre';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  private userUrl = "http://localhost:8081/api/medicos";
  constructor(private http: HttpClient) { }

  public atenderCita(atencionMedico: AtencionMedicoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userUrl}/atender-cita`, atencionMedico);
  }

  public listarCitasPendientes(codigoMedico:number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/listar-citas-pendientes/${codigoMedico}`);
  }

  public listarDiasLibres(codigoMedico:number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/listar-dias-libres/${codigoMedico}`);
  }

  public listarCitaPaciente(codigoPaciente:number): Observable<MensajeDTO>{
    return this.http.get<MensajeDTO>(`${this.userUrl}/listar-citas-paciente/${codigoPaciente}`);
  }

  public agendarDiaLibre(diaLibre:DiaLibreDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userUrl}/agendar-dia-libre`, diaLibre);
  }

  public listarCitasRealizadasMedico(codigoMedico:number): Observable<MensajeDTO>{
    return this.http.get<MensajeDTO>(`${this.userUrl}/listar-citas-realizadas/${codigoMedico}`);
  }
}