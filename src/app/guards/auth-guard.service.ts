import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor() { }
  private isAuthenticated: boolean = false;

  alter(valor:boolean){
    this.isAuthenticated = valor;
  }
  canActivate() {
    return this.isAuthenticated;
  }

  iframeAuthentication(valor:boolean){
    this.isAuthenticated  = valor;
  }
}