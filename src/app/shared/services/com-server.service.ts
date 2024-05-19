import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ComServerService {
  constructor(private http: HttpClient) {}

  sendDataSignUp(data: any, endpoint: string) {
    // Concaténez l'endpoint fourni à l'URL de base
    const url = `https://localhost:3000/api/hospital/${endpoint}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(url, data);
  }

  sendData(data: any, endpoint: string, authToken: string) {
    const url = `https://localhost:3000/api/hospital/${endpoint}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    });

    return this.http.post<any>(url, data);
  }
}
