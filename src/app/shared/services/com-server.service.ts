import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ComServerService {
  constructor(private http: HttpClient) {}

  // Méthode générique pour envoyer des données
  sendData(data: any, endpoint: string) {
    // Concaténez l'endpoint fourni à l'URL de base
    const url = `https://localhost:3000/api/${endpoint}`;
    // Envoyez les données à l'URL construite
    return this.http.post<any>(url, data);
  }
}
