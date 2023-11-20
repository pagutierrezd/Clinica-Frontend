import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { LoginDTO } from 'src/app/modelo/clinica/LoginDTO';
import { AuthService } from 'src/app/servicios/auth.service';
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { TokenService } from 'src/app/servicios/token.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginDTO: LoginDTO;
  alerta!: Alerta;
  mostrarMensaje: string = "";
  mostrarMess: boolean = false;

  constructor(private tokenService: TokenService, private authService: AuthService, private clinicaService: ClinicaService, private router:Router, private pacienteService:PacienteService) {
    this.loginDTO = new LoginDTO();
  }

  public login() {
    this.authService.login(this.loginDTO).subscribe({
      next: data => {
        this.tokenService.login(data.respuesta.token);
        this.router.navigate(['/paciente/inicio-paciente'])

      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
        console.log("error", error)
      }
    });
  }

  enviarLinkRecuperacion(event: Event) {
    event.preventDefault();

    if (this.loginDTO.email == "") {
      this.mostrarMess = true;
      this.mostrarMensaje = "Debes ingresar el correo si quieres recuperar la cuenta"

    } else {
      this.mostrarMess = false;
      let email: string = this.loginDTO.email;

      this.pacienteService.cambiarPassword(email).subscribe({
        next: data => {
          this.alerta = { mensaje: data.respuesta, tipo: "success" };
          console.log(data);
        },
        error: error => {
          this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
        }
      });
    }


  }
}
