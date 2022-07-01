import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from './auth/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(public readonly loginService: LoginService) {}

  isLoggedIn$ = this.loginService.loggedIn$;

  ngOnInit(): void {
    this.loginService.profile();
  }
}
