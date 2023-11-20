import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { CambioPasswordDTO } from 'src/app/modelo/clinica/NuevaPasswordDTO';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent {

  alerta!: Alerta
  cambiarPasswordDTO: CambioPasswordDTO;
  email: string = ""

  constructor(private route: ActivatedRoute, private pacienteService: PacienteService, private tokenService: TokenService) {
    this.cambiarPasswordDTO = new CambioPasswordDTO;
    this.route.params.subscribe(params => {
      this.email = params['email'];

    });
  }

  public cambiarPasssword() {

    this.cambiarPasswordDTO.email = this.email;

   
  }

  public sonIguales(): boolean {
    return this.cambiarPasswordDTO.nuevaPassword == this.cambiarPasswordDTO.confirmaPassword;
  }
}
