import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComServerService {
  constructor(private http: HttpClient, private router: Router) {}

  sendDataLogin(data: any, endpoint: string) {
    // Concaténez l'endpoint fourni à l'URL de base
    const url = `https://localhost:3000/api/hospital/${endpoint}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(url, data, { headers });
  }

  sendData(data: any, endpoint: string, authToken: string) {
    // Vérifier si le token est présent
    if (!authToken) {
      // Rediriger vers la page de login
      this.router.navigate(['/login']);
      alert('Veuillez-vous authentifier ou vous inscrire svp');
      return throwError(
        () => new Error('Veuillez-vous authentifier ou vous inscrire svp')
      );
    }

    const url = `https://localhost:3000/api/hospital/${endpoint}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    });
    console.log('Headers:');
    headers.keys().forEach((name) => {
      console.log(`${name}: ${headers.get(name)}`);
    });
    console.log('Data sent:', data); // Ajout du console.log pour afficher les données envoyées

    return this.http.post<any>(url, data, { headers });
  }
}
