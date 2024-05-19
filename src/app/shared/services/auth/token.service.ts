import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  getToken() {
    throw new Error('Method not implemented.');
  }
  private csrfToken: string | null = null;

  constructor() {}

  setCsrfToken(token: string) {
    this.csrfToken = token;
  }

  getCsrfToken(): string | null {
    return this.csrfToken;
  }
}
