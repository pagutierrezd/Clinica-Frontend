import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { DiaLibreDTO } from 'src/app/modelo/medico/AgendarDiaLibre';
import { MedicoService } from 'src/app/servicios/medico.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-dia-libre',
  templateUrl: './dia-libre.component.html',
  styleUrls: ['./dia-libre.component.css']
})
export class DiaLibreComponent {

  diaLibre:DiaLibreDTO;
  diasLibres:DiaLibreDTO[];
  alerta!:Alerta

  constructor(private medicoService:MedicoService, private tokenService:TokenService){
    this.diaLibre= new DiaLibreDTO;
    this.diasLibres=[]
    this.mostrarDiasLibres()
  }

  public mostrarDiasLibres(){
  
    let codigoMedico = this.tokenService.getCodigo(); 
    
    this.medicoService.listarDiasLibres(codigoMedico).subscribe({
      next: data => {
        this.diasLibres=data.respuesta;
       
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

  public agendarDiaLibre(){

    let codigoMedico = this.tokenService.getCodigo();

    this.diaLibre.codigoMedico=codigoMedico;

    this.medicoService.agendarDiaLibre(this.diaLibre).subscribe({
      next: data => {
        this.alerta = { mensaje: data.respuesta, tipo: "success" };
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }


}
