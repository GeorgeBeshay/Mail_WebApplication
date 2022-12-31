import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackEndCallerService } from 'src/app/Services/back-end-caller.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  private myBECaller: BackEndCallerService;
  // -------------- Separator --------------
  constructor(private http: HttpClient, private _router: Router) {
    this.myBECaller = new BackEndCallerService(this.http);
  }
  // -------------- Separator --------------
  ngOnInit(): void {}
  // -------------- Separator --------------
  async signIn() {
    let tempEmail: any = (
      document.getElementById('email') as HTMLInputElement | null
    )?.value;
    let tempPw: any = (document.getElementById('pw') as HTMLInputElement | null)
      ?.value;
    let tempReturned = await this.myBECaller.reqSignIn(tempEmail, tempPw);
    console.log(tempReturned);
    if (tempReturned !== null) {
      this._router.navigate(['ViewEmails']);
    } else {
      alert('Authentication Failed.');
    }
  }
  // -------------- Separator --------------
  signUp() {
    this._router.navigate(['SignUp']);
  }
  // -------------- Separator --------------
}
