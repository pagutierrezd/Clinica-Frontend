import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../modelo/otros/MensajeDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClinicaService {
  private clinicaURL = "http://localhost:8081/api/clinica";
  constructor(private http: HttpClient) { }

  public listarCiudades(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clinicaURL}/ciudades`);
  }
  public listarEstadosPqrs(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clinicaURL}/estado-pqrs`);
  }
  public listarTipoSangre(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clinicaURL}/tipo-sangre`);
  }
  public listarEPS(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clinicaURL}/eps`);
  }
  public listarEspecialidades(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clinicaURL}/lista-especialidades`);
  }
  public enviarLinkRecuperacion(email:string):Observable<MensajeDTO>{
    return this.http.get<MensajeDTO>(`${this.clinicaURL}/enviar-link-recuperacion/${email}`);
  }
}
