import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private resetEmail:string='';

  constructor() { }

  setEmail(email:string){
    this.resetEmail=email;
  }

  getEmail(){
    return this.resetEmail;
  }

  clearEmail(){
    this.resetEmail='';
  }
}

// AuthState is to temporarily save Email filled in forgot-password form, but will not be displayed.

