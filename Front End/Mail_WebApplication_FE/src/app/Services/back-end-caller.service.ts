import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { User } from '../Interfaces/user';
import { Contact } from '../Interfaces/contact';
import { Email } from '../Interfaces/email';

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
      this.http.post<User>(
        this.url + 'createNewFolder/' + newFolderName,
        currentUser
      )
    );
  }
  // ---------------- Separator ----------------
  async addNewContact(currentUser: User) {
    return await firstValueFrom(
      this.http.post<User>(this.url + 'addnewContact/', currentUser)
    );
  }
  // ---------------- Separator ----------------
  async deletContact(currentUser: User, i: number) {
    return await firstValueFrom(
      this.http.post<User>(this.url + 'deleteContact/' + i, currentUser)
    );
  }
  // ---------------- Separator ----------------
  async sendAnEmail(currentUser: User, emailInstance: Email) {
    return await firstValueFrom(
      this.http.post<User>(this.url + 'sendEmail/', {
        activeUser: currentUser,
        email: emailInstance,
      })
    );
  }
  // ---------------- Separator ----------------
  async deleteAnEmail(
    currentUser: User,
    folderIndex: number,
    emailIndex: number
  ) {
    return await firstValueFrom(
      this.http.post<User>(this.url + 'deleteEmail/', {
        activeUser: currentUser,
        activeFolderIndex: folderIndex,
        activeEmailIndex: emailIndex,
      })
    );
  }
  // ---------------- Separator ----------------
  async deleteFolder(currentUser: User, folderIndex: number) {
    return await firstValueFrom(
      this.http.post<User>(this.url + 'deleteFolder/', {
        activeUser: currentUser,
        activeFolderIndex: folderIndex,
        activeEmailIndex: -1,
      })
    );
  }
  // ---------------- Separator ----------------
  async moveEmail(
    currentUser: User,
    fromFolderIndex: number,
    toFolderIndex: number,
    emailIndex: number
  ) {
    return await firstValueFrom(
      this.http.post<User>(
        this.url +
          `moveEmail/${fromFolderIndex}/${toFolderIndex}/${emailIndex}/`,
        currentUser
      )
    );
  }
  // ---------------- Separator ----------------
  async updateUserData(currentUser: User) {
    return await firstValueFrom(
      this.http.post<User>(this.url + 'updateUserInfo/', currentUser)
    );
  }
  // ---------------- Separator ----------------
  async reqSortEmails(folderIndex: number, flag: boolean,user: User ) {
    return await firstValueFrom(
      this.http.post<User>(this.url + 'sortEmails/'+ folderIndex +'/' + flag, user)
    );
  }
  // ---------------- Separator ----------------

}
