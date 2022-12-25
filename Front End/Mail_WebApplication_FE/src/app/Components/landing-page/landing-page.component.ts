import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BackEndCallerService } from 'src/app/Services/back-end-caller.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  private myBECaller: BackEndCallerService;
  // -------------- Separator --------------
  constructor(private http: HttpClient) {
    this.myBECaller = new BackEndCallerService(this.http);
  }
  // -------------- Separator --------------
  ngOnInit(): void {}
  // -------------- Separator --------------
  signIn() {
    let tempEmail: any = document.getElementById('email');
    let tempPw: any = document.getElementById('pw');
    this.myBECaller.reqSignIn(tempEmail, tempPw);
  }
  // -------------- Separator --------------
  signUp() {
    let tempEmail: any = document.getElementById('newEmail');
    let tempPw: any = document.getElementById('newPw');
    this.myBECaller.reqSignUp(tempEmail, tempPw);
  }
  // -------------- Separator --------------
}
