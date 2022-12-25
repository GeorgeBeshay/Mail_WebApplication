import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackEndCallerService } from 'src/app/Services/back-end-caller.service';

@Component({
  selector: 'app-mail-page',
  templateUrl: './mail-page.component.html',
  styleUrls: ['./mail-page.component.css'],
})
export class MailPageComponent implements OnInit {
  private myBECaller: BackEndCallerService;
  // -------------- Separator --------------
  constructor(private http: HttpClient) {
    this.myBECaller = new BackEndCallerService(this.http);
  }
  // -------------- Separator --------------

  ngOnInit(): void {}
}
