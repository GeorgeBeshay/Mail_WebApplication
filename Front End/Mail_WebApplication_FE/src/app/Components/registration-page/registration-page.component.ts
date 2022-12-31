import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BackEndCallerService } from 'src/app/Services/back-end-caller.service';
import { isEmpty } from 'rxjs';
import { User } from 'src/app/Interfaces/user';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css'],
})
export class RegistrationPageComponent implements OnInit {
  private myBECaller: BackEndCallerService;

  constructor(private http: HttpClient, private _router: Router) {
    this.myBECaller = new BackEndCallerService(this.http);
  }

  ngOnInit(): void {}

  async register() {
    let emailAddress = document.getElementById('email') as HTMLInputElement;
    let emailPassword = document.getElementById('pw') as HTMLInputElement;
    let confirmPassword = document.getElementById('cpw') as HTMLInputElement;
    let fullName = document.getElementById('fName') as HTMLInputElement;
    let bd = document.getElementById('bd') as HTMLInputElement;
    if (
      emailAddress.value.length == 0 ||
      emailPassword.value.length == 0 ||
      confirmPassword.value.length == 0 ||
      fullName.value.length == 0 ||
      bd.value.length == 0
    ) {
      alert('The Registeration Form is not completely filled.');
      // alert(bd.value);
      return;
    }
    if (emailPassword.value != confirmPassword.value) {
      alert('Password confirmation does not match the password.');
      return;
    }
    const user = {
      emailAddress: emailAddress.value,
      emailPassword: emailPassword.value,
      fullName: fullName.value,
      birthDate: new Date(bd.value),
    };
    // Call the sign up request method
    let tempReturned = await this.myBECaller.reqSignUp(user);
    console.log(tempReturned);
    if (tempReturned != null) this._router.navigate(['ViewEmails']);
    else {
      alert('The Email Address Specified is already taken.');
    }
  }
}
