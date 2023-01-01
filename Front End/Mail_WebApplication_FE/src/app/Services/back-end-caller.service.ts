import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { User } from '../Interfaces/user';
import { Contact } from '../Interfaces/contact';

@Injectable({
  providedIn: 'root',
})
export class BackEndCallerService {
  private port = 8081;
  private url = `http://localhost:${this.port}/callBackEndServer/`;
  constructor(private http: HttpClient) {}
  // ---------------- Separator ----------------
  async reqSignIn(email: string, pw: string) {
    return await firstValueFrom(
      this.http.post(this.url + 'signIn', {
        emailAddress: email,
        emailPassword: pw,
      })
    );
  }
  // ---------------- Separator ----------------
  async reqSignUp(user: any) {
    return await firstValueFrom(this.http.post(this.url + 'signUp', user));
  }
  // ---------------- Separator ----------------
  async reqAddFolder(currentUser: User, newFolderName: string) {
    return await firstValueFrom(
      this.http.post<User>(this.url + 'createNewFolder/' + newFolderName, currentUser)
    );
    // return await this.http.post<User>(
    //   this.url + 'createNewFolder/' + newFolderName,
    //   currentUser
    // );
  }
  // ---------------- Separator ----------------
  async addNewContact(currentUser: User) {
    return await firstValueFrom(this.http.post<User>(this.url + 'addnewContact/', currentUser));
  }
  
  async deletContact(currentUser: User, i: number ) {
    return await firstValueFrom(this.http.post<User>(this.url + 'deleteContact/'+i, currentUser));
  }
}
