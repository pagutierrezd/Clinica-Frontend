import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { CambioPasswordDTO } from 'src/app/modelo/clinica/NuevaPasswordDTO';
import { AuthService } from 'src/app/servicios/auth.service';
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent {

  alerta!: Alerta
  cambiarPasswordDTO: CambioPasswordDTO;
  email:string = ""

  constructor(private route: ActivatedRoute, private authService: AuthService, private tokenService: TokenService) {
    this.cambiarPasswordDTO = new CambioPasswordDTO;
    this.route.params.subscribe(params => {
      this.email = params['email'];
      
    });
  }

  public cambiarPasssword(){

    this.cambiarPasswordDTO.email=this.email;

    this.authService.cambiarPassword(this.cambiarPasswordDTO).subscribe({
      next: data => {
        this.alerta = { mensaje: data.respuesta, tipo: "success" };
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

  public sonIguales(): boolean {
    return this.cambiarPasswordDTO.nuevaPassword == this.cambiarPasswordDTO.confirmaPassword;
  }
}