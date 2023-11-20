import { Component } from '@angular/core';
import { TokenService } from './servicios/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UniClínica';

  isLogged = false;
  email: string = "";
  constructor(private tokenService: TokenService, private router: Router) { }
  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    if (this.isLogged) {
      this.email = this.tokenService.getEmail();
    }
  }
  public logout() {
    this.tokenService.logout();
  }

}

