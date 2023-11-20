import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { LoginComponent } from './pagina/login/login.component';
import { RegistroComponent } from './pagina/registro/registro.component';
import { DiaLibreComponent } from './pagina/medico/dia-libre/dia-libre.component';
import { AgendaComponent } from './pagina/medico/agenda/agenda.component';
import { ConsultaComponent } from './pagina/medico/consulta/consulta.component';
import { HistoricoConsultasComponent } from './pagina/medico/historico-consultas/historico-consultas.component';
import { GestionMedicosComponent } from './pagina/admin/gestion-medicos/gestion-medicos.component';
import { HistorialConsultasComponent } from './pagina/admin/historial-consultas/historial-consultas.component';
import { MenuAdminComponent } from './pagina/admin/menu-admin/menu-admin.component';
import { MenuMedicoComponent } from './pagina/medico/menu-medico/menu-medico.component';
import { PqrsAdminComponent } from './pagina/admin/pqrs-admin/pqrs-admin.component';
import { RegistroMedicosComponent } from './pagina/admin/registro-medicos/registro-medicos.component';
import { RecuperarPasswordComponent } from './pagina/recuperar-password/recuperar-password.component';
import { ConsultasPacienteComponent } from './pagina/paciente/consultas-paciente/consultas-paciente.component';
import { GestionInfoPersonalComponent } from './pagina/paciente/gestion-info-personal/gestion-info-personal.component';
import { PedirCitaComponent } from './pagina/paciente/pedir-cita/pedir-cita.component';
import { PqrsPacienteComponent } from './pagina/paciente/pqrs-paciente/pqrs-paciente.component';
import { AlertaComponent } from './pagina/alerta/alerta.component';
import { UsuarioInterceptor } from './interceptor/usuario.interceptor';
import { InicioPacienteComponent } from './pagina/paciente/inicio-paciente/inicio-paciente.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    RegistroComponent,
    DiaLibreComponent,
    AgendaComponent,
    ConsultaComponent,
    HistoricoConsultasComponent,
    GestionMedicosComponent,
    HistorialConsultasComponent,
    MenuAdminComponent,
    MenuMedicoComponent,
    PqrsAdminComponent,
    RegistroMedicosComponent,
    RecuperarPasswordComponent,
    ConsultasPacienteComponent,
    GestionInfoPersonalComponent,
    PedirCitaComponent,
    PqrsPacienteComponent,
    AlertaComponent,
    InicioPacienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: UsuarioInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
