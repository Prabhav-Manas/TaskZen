import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setAccessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  setRefreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  setTokens(access: string) {
    localStorage.setItem('accessToken', access);
    // localStorage.setItem('refreshToken', refresh);
  }

  clearTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
