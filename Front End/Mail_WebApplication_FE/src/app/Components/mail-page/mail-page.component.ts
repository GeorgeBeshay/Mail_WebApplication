import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackEndCallerService } from 'src/app/Services/back-end-caller.service';
import { Email } from 'src/app/Interfaces/email';
import { User } from 'src/app/Interfaces/user';
import { Folder } from 'src/app/Interfaces/folder';
import { ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'app-mail-page',
  templateUrl: './mail-page.component.html',
  styleUrls: ['./mail-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MailPageComponent implements OnInit {
  private myBECaller: BackEndCallerService;
  public selectedFolder: string = '';
  public selectedEmail!: Email;
  // -------------- Separator --------------
  constructor(private http: HttpClient) {
    this.myBECaller = new BackEndCallerService(this.http);
  }
  // -------------- Separator --------------
  ngOnInit(): void {
    this.resetSelectedEmail();
  }
  // -------------- Separator --------------
  myEmails: Email[] = [];
  generateMails() {
    this.myEmails.push({
      sender: 'UserA',
      receiver: 'UserB',
      subject: 'Party Invitation',
      body: "Hey UserB, I'd like to invite you to my birthday party next tuesday morning at 12:00 AM, kindly check the invitation card at the attachments section.",
      attachments: [{ Name: 'Invitation Card', 'Card Number': '#22342342' }],
    });
    this.myEmails.push({
      sender: 'UserX',
      receiver: 'UserB',
      subject: 'Wedding Invitation',
      body: "Hey UserB, I'd like to invite you to my wedding party next thursday morning at 12:00 AM, kindly check the invitation card at the attachments section.",
      attachments: [{ Name: 'Invitation Card', 'Card Number': '#654651' }],
    });
  }
  // -------------- Separator --------------
  selectFolder(folderName: string) {
    this.selectedFolder = folderName;
    this.generateMails();
    // console.log("emails" , this.myEmails);
    this.resetSelectedEmail();
  }
  selectEmail(emailSubject: Email) {
    this.selectedEmail = emailSubject;
  }
  refreshMailBox() {}
  // -------------- Separator --------------
  resetSelectedEmail() {
    this.selectedEmail = {
      sender: 'NA',
      receiver: 'NA',
      subject: 'NA',
      body: 'NA',
      attachments: [],
    };
  }
  // -------------- Separator --------------  
  compose_email() {
    console.log("in compose email")
    const elem = document.getElementById("content");
    if(elem == null) return;
    elem.innerHTML = `
    <div class="composeEmail"> 
      <div>
        From:
        <input disabled type="email">
      </div>

      <div>
        To:
        <input type="email">
      </div>
      
      <div>
      Subject:
      <input type="text">
      </div>

      <div>
        Body:
        <textarea rows="20" cols="50" ></textarea>
      </div>
    </div>
    `;

  }
  // -------------- Separator --------------
}
