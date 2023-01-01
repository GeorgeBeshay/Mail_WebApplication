import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackEndCallerService } from 'src/app/Services/back-end-caller.service';
import { FileUploadDownloadService } from 'src/app/Services/file-upload-download.service';
import { Email } from 'src/app/Interfaces/email';
import { User } from 'src/app/Interfaces/user';
import { Folder } from 'src/app/Interfaces/folder';
import { ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mail-page',
  templateUrl: './mail-page.component.html',
  styleUrls: ['./mail-page.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MailPageComponent implements OnInit {
  private myBECaller: BackEndCallerService;
  private fileUploadDownload: FileUploadDownloadService;
  public selectedFolder: string = '';
  public selectedEmail!: Email;
  private myEmails: Email[] = [];
  private myUser!: User;
  // -------------- Separator --------------
  constructor(private http: HttpClient, private route: ActivatedRoute, private _router:Router) {
    this.myBECaller = new BackEndCallerService(this.http);
    this.fileUploadDownload = new FileUploadDownloadService(this.http);
    this.route.queryParams.subscribe((params) => {
      this.myUser = JSON.parse(params['userObj']);
    });
  }
  // -------------- Separator --------------
  ngOnInit(): void {
    this.resetSelectedEmail();
    this.generateMails();
    this.selectedFolder = this.myUser.folders[0].name;
    this.generateFolders();
  }
  // -------------- Separator --------------
  generateFolders() {
    let foldersHolders = document.getElementById('foldersHolder');
    if (!foldersHolders) return;
    foldersHolders.innerHTML = ``;
    for (let i = 5; i < this.myUser.folders.length; i++) {
      let currentFolder = this.myUser.folders[i];
      let tempFolder = document.createElement('div');
      let tempButton = document.createElement('button');
      tempButton.addEventListener('click', (func) => {
        this.selectFolder(i);
      });
      let tempPar = document.createElement('p');
      tempPar.appendChild(document.createTextNode(currentFolder.name));
      tempButton.appendChild(tempPar);
      tempFolder.appendChild(tempButton);
      foldersHolders.appendChild(tempFolder);
      console.log(tempFolder);
    }
  }
  // -------------- Separator --------------
  selectFolder(folderName: any) {
    this.selectedFolder = folderName;
    this.resetSelectedEmail();
    const tempEmailsHolder = document.getElementById('emailsHolder');
    if (!tempEmailsHolder) return;
    tempEmailsHolder.innerHTML = ``;
    for (let email of this.myEmails) {
      tempEmailsHolder.innerHTML += `<div>${email.subject}</div>`;
      tempEmailsHolder.lastElementChild?.classList.add('emailSubj');
    }
    for (let i = 0; i < tempEmailsHolder.children.length; i++) {
      let tempButtonsHolder = document.createElement('div');
      let tempViewButtonElement = document.createElement('button');
      tempViewButtonElement.appendChild(document.createTextNode('View'));
      tempViewButtonElement.addEventListener('click', (func3) => {
        this.selectEmail(this.myEmails[i]);
      });
      let tempDeleteButtonElement = document.createElement('button');
      tempDeleteButtonElement.appendChild(document.createTextNode('Delete'));
      tempDeleteButtonElement.addEventListener('click', (func2) => {
        this.deleteEmail(this.myEmails[i]);
      });
      tempButtonsHolder.appendChild(tempViewButtonElement);
      tempButtonsHolder.appendChild(tempDeleteButtonElement);
      tempEmailsHolder.children[i].appendChild(tempButtonsHolder);
    }
  }
  // -------------- Separator --------------
  deleteEmail(email: Email) {
    console.log('Delete Email');
    this.myEmails.splice(this.myEmails.indexOf(email), 1);
    this.selectFolder(this.selectedFolder);
    // this.resetSelectedEmail();
  }
  // -------------- Separator --------------
  selectEmail(email: Email) {
    this.selectedEmail = email;
    console.log('in select email');
    const elem = document.getElementById('content');
    if (elem == null) return;
    elem.innerHTML = `
    <div class="composeEmail">
      <div>
        <div>From:</div>
        <input value="${this.selectedEmail.sender}" disabled type="email">
      </div>
      <div>
        <div>To:</div>
        <input value="${this.selectedEmail.receiver}" disabled type="email">
      </div>
      <div>
        <div>Subject:</div>
        <input value="${this.selectedEmail.subject}" disabled type="text">
      </div>
      <div>
        <div>Body:</div>
        <textarea style="font-size: 17px;" readonly>${this.selectedEmail.body}
        </textarea>
      </div>
      <div>
        <div>Attachments:</div>
        <div class="attachmentsHolder" id ='attachmentsHolderID'>
          <div>
          <button onclick="document.getElementById('fileUpload').click()">Attach</button>
          <input type="file" (change)="onFileSelected($event)" id = "fileUpload" multiple style="visibility: hidden;">
          </div>
        </div>
      </div>
    </div>
    `;
    let tempInput = document.getElementById('fileUpload');
    tempInput?.addEventListener('change', (event) => {
      this.onFileSelected(event);
    });
  }
  // -------------- Separator --------------
  compose_email() {
    console.log('in compose email');
    // const elem = document.getElementById('content');
    // if (elem == null) return;
    // elem.innerHTML = `
    //   <div class="composeEmail" >
    //     <div class="From">from: </div>
    //     <input disabled type="email" placeholder="userAccount@mail.com" id="FromID">
    //   </div>
    // `;
    // elem.innerHTML += 
    // `<div class="to"> 
    //     <div>To:</div>
    //     <input type="email" placeholder="JohnDoe@mail.com" id="ToID">
    // </div>`;

    // elem.innerHTML += 
    // `<div class="subject"> 
    //     <div>Subject:</div>
    //     <input type="text" placeholder="Email Subject" id="SubjID">
    // </div>`;

    // elem.innerHTML += 
    // `<div class="body"> 
    //     <div>Body:</div>
    //     <textarea style="font-size: 17px;" id="TextID"></textarea>
    // </div>`;

    // elem.innerHTML += 
    // `<div class="sendB">
    //     <button>
    //         SEND
    //       </button>
    // </div>`;


    // let tempdb=document.createElement('div');
    // tempdb.classList.add("ButtonsDiv");
    // let tempButtonsHolder = document.createElement('div');
    //   tempButtonsHolder.classList.add('buttonHolder');
    //   let tempEditButtonElement = document.createElement('button');
    //   tempEditButtonElement.appendChild(document.createTextNode('+'));
    //   tempEditButtonElement.addEventListener('click', (func4) => {
    //     let tempInput = document.createElement('input');
    //     tempInput.type="email";
    //     let emailCont = document.getElementById('Emails');
    //     emailCont?.appendChild(tempInput);
    //   });
      
    //   tempButtonsHolder.appendChild(tempEditButtonElement);
    //   tempdb.appendChild(tempButtonsHolder);
    //   elem.appendChild(tempdb);

    //   let tempSaveD=document.createElement('div');
    //   let tempSaveB=document.createElement('button');
    //   tempSaveB.appendChild(document.createTextNode('SAVE'));
    //   tempSaveB.classList.add("SaveButton");

    //   tempdb.appendChild(tempSaveB);
    //   tempSaveD.appendChild(tempdb);
    //   elem.appendChild(tempSaveD);



    const elem = document.getElementById('content');
    if (elem == null) return;
    elem.innerHTML = `
    <div class="composeEmail">
      <div class="from" >
        <div>From:</div>
        <input disabled type="email" placeholder="userAccount@mail.com"">
      </div>
      <div class="to">
        <div>To:</div>
        <input type="email" placeholder="JohnDoe@mail.com">
      </div>
      <div class="subject">
      <div>Subject:</div>
      <input type="text" placeholder="Email Subject">
      </div>
      <div class="body">
        <div>Body:</div>
        <textarea style="font-size: 17px;"></textarea>
        <div class="sendB">
          <button>
            SEND
          </button>
        </div>
      </div>
      <div>
        <div>Attachments:</div>
        <div class="attachmentsHolder">
          <div>
          <button onclick="document.getElementById('fileUpload').click()">Attach</button>
          <input type="file" id = "fileUpload" multiple style="visibility: hidden;">
          </div>
          <div id="attachedFiles"></div>
        </div>
      </div>
    </div>
    `;
    let tempInput = document.getElementById('fileUpload');
    tempInput?.addEventListener('change', (event) => {
      this.onFileSelected(event);
    });
  }
  // -------------- Separator --------------
  refreshMailBox() {
    this.selectFolder(this.selectedFolder);
    this.resetSelectedEmail();
  }
  // -------------- Separator --------------
  resetSelectedEmail() {
    this.selectedEmail = {
      sender: 'NA',
      receiver: 'NA',
      subject: 'NA',
      body: 'NA',
      attachments: [],
    };
    const elem = document.getElementById('content');
    if (elem) elem.innerHTML = ``;
  }
  // -------------- Separator --------------
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
    this.myEmails.push({
      sender: 'UserZ',
      receiver: 'UserY',
      subject: 'Wedding Invitationnnn',
      body: "Hey UserB, I'd like to invite you to my wedding party next thursday morning at 12:00 AM, kindly check the invitation card at the attachments section.",
      attachments: [{ Name: 'Invitation Card', 'Card Number': '#654651' }],
    });
  }
  // -------------- Separator --------------
  onFileSelected(event: any) {
    let selectedFiles = event.target.files;
    let fileArray: File[] = [];
    let filenames: string[] = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      fileArray[i] = selectedFiles[i];
      filenames.push(fileArray[i].name);
    }
    this.fileUploadDownload.onUploadFiles(fileArray);
    this.showFilesAttached(filenames);
  }
  // -------------- Separator --------------
  showFilesAttached(fileNames: string[]) {
    let attachmentsHolder = document.getElementById('attachedFiles');
    if (attachmentsHolder) attachmentsHolder.innerHTML = ``;
    console.log(attachmentsHolder);
    for (let i = 0; i < fileNames.length; i++) {
      let tempDiv = document.createElement('div');
      let tempPar = document.createElement('p');
      let tempButton = document.createElement('button');
      tempButton.appendChild(document.createTextNode('X'));
      tempPar.appendChild(document.createTextNode(fileNames[i]));
      tempDiv.appendChild(tempPar);
      tempDiv.appendChild(tempButton);
      attachmentsHolder?.appendChild(tempDiv);
      tempDiv.classList.add('attachment');
      tempPar.id = 'downloadFile';
      tempButton.id = 'deleteButton';
      tempPar.addEventListener('click', (func) => {
        this.fileUploadDownload.onDownloadFile(fileNames[i]);
      });
      tempButton.addEventListener('click', (func) => {
        fileNames = this.fileUploadDownload.deleteAttachement(
          fileNames[i],
          fileNames
        );
        console.log(fileNames);
        this.showFilesAttached(fileNames);
      });
    }
  }
  // -------------- Separator --------------
  async addFolder() {
    let folderName = document.getElementById(
      'newFolderName'
    ) as HTMLInputElement;
    if (folderName.value.length > 0) {
      this.myUser = await this.myBECaller.reqAddFolder(
        this.myUser,
        folderName.value
      );
      this.generateFolders();
      this.reloadPage();
      let tempDiv = document.getElementById('createFolder') as HTMLDivElement;
      tempDiv.style.visibility = 'hidden';
    } else {
      alert('Folder name is invalid');
      return;
    }
  }
  // -------------- Separator --------------
  cancelAdding() {
    let tempDiv = document.getElementById('createFolder') as HTMLDivElement;
    tempDiv.style.visibility = 'hidden';
  }
  // -------------- Separator --------------
  showFolderCreationPage() {
    let tempDiv = document.getElementById('createFolder') as HTMLDivElement;
    tempDiv.style.visibility = 'visible';
  }
  // -------------- Separator --------------
  ContactsInfo(){
    console.log("Going to contacts");
    this._router.navigate(['Contacts'],{
      queryParams:{ userObj: JSON.stringify(this.myUser)},
    });
  }
  reloadPage(){
    this._router.navigate(['ViewEmails'], {
      queryParams: { userObj: JSON.stringify(this.myUser) },
      replaceUrl: true,
    });
  }

}
