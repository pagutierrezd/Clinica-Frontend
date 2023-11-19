import { Injectable } from '@angular/core';
import { ItemPqrDTO } from '../modelo/clinica/ItemPqrDTO';
import { RegistroPqrDTO } from '../modelo/paciente/RegistroPqrDTO';

@Injectable({
  providedIn: 'root'
})
export class PqrsService {

  pqrs: ItemPqrDTO[];
  constructor() {
    this.pqrs = [];
    this.pqrs.push({
      codigo: 1, motivo: 'solicitud de alguna información', fecha:
        '2023-11-05', estadoPqrs: 'ACTIVO'
    });
    this.pqrs.push({
      codigo: 2, motivo: 'solicitud para cambio de la fecha',
      fecha: '2023-08-23', estadoPqrs: 'ACTIVO'
    });
    this.pqrs.push({
      codigo: 3, motivo: 'solicitud de alguna información', fecha:
        '2023-11-10',  estadoPqrs: 'CERRADO'
    });
    this.pqrs.push({
      codigo: 4,  motivo: 'queja sobre el médico que me atendió', fecha:
        '2023-09-01', estadoPqrs: 'ACTIVO'
    });
  }
  public listar(): ItemPqrDTO[] {
    return this.pqrs;
  }
  public obtener(codigo: number): ItemPqrDTO | undefined {
    return this.pqrs.find(pqrs => pqrs.codigo == codigo);
  }
  public crear(pqrs: RegistroPqrDTO) {
    let codigo = this.pqrs.length + 1;
    this.pqrs.push({
      codigo: codigo,  motivo: pqrs.motivo, fecha: new
        Date().toISOString(), estadoPqrs: 'ACTIVO'
    });
  }
}