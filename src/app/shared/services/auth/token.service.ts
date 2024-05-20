import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private csrfTokenKey = 'csrfToken';

  constructor() {}

  setCsrfToken(token: string) {
    sessionStorage.setItem(this.csrfTokenKey, token); //on force le stockage en session storage sinon le token se réinitialise à chaque changement de page
    console.log('CSRF Token set:', token);
  }

  getCsrfToken(): string | null {
    const token = sessionStorage.getItem(this.csrfTokenKey);
    console.log('CSRF Token retrieved:', token);
    return token;
  }
}
