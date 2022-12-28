import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackEndCallerService {
  private port = 8081;
  private url = `http://localhost:${this.port}/callBackEndServer/`;
  constructor(private http: HttpClient) {}
  // ---------------- Separator ----------------
  async reqSignIn(email: string, pw: string) {
    return await firstValueFrom(this.http.post(this.url + email, pw));
  }
  // ---------------- Separator ----------------
  async reqSignUp(email: string, pw: string) {
    return await firstValueFrom(this.http.post(this.url + email, pw));
  }
  // ---------------- Separator ----------------
}