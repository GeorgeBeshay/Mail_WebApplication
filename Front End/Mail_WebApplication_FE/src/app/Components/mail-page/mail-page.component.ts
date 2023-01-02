import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackEndCallerService } from 'src/app/Services/back-end-caller.service';
import { FileUploadDownloadService } from 'src/app/Services/file-upload-download.service';
import { Email } from 'src/app/Interfaces/email';
import { User } from 'src/app/Interfaces/user';
import { Folder } from 'src/app/Interfaces/folder';
import { ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/Interfaces/contact';
import { EmailBuilderService } from 'src/app/Services/email-builder.service';

@Component({
  selector: 'app-mail-page',
  templateUrl: './mail-page.component.html',
  styleUrls: ['./mail-page.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MailPageComponent implements OnInit {
  private myBECaller: BackEndCallerService;
  private fileUploadDownload: FileUploadDownloadService;
  public selectedFolder!: Folder;
  public selectedEmail!: Email;
  private myEmails: Email[] = [];
  private myUser!: User;
  private attachedFiles!: string[];
  // -------------- Separator --------------
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private _router: Router
  ) {
    this.myBECaller = new BackEndCallerService(this.http);
    this.fileUploadDownload = new FileUploadDownloadService(this.http);
    this.route.queryParams.subscribe((params) => {
      this.myUser = JSON.parse(params['userObj']);
    });
  }
  // -------------- Separator --------------
  ngOnInit(): void {
    this.resetSelectedEmail();
    // this.generateMails();
    this.selectedFolder = this.myUser.folders[0];
    this.attachedFiles = [];
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
  selectFolder(folderIndex: any) {
    this.selectedFolder = this.myUser.folders[folderIndex];
    this.resetSelectedEmail();
    if (this.myUser.folders[folderIndex].emails.length > 0) {
      this.myEmails = this.myUser.folders[folderIndex].emails;
      console.log(this.myEmails);
    } else this.myEmails = [];
    const tempEmailsHolder = document.getElementById('emailsHolder');
    if (!tempEmailsHolder) return;
    tempEmailsHolder.innerHTML = ``;
    if (this.myEmails.length <= 0) return;
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
    if (this.myEmails.length > 3) {
      console.log('reached');
      tempEmailsHolder.style.overflowY = 'scroll';
    } else {
      tempEmailsHolder.style.overflowY = 'hidden';
    }
  }
  // -------------- Separator --------------
  async deleteEmail(email: Email) {
    console.log('Delete Email');
    // this.myEmails.splice(this.myEmails.indexOf(email), 1);
    // this.myUser.folders.indexOf(this.selectedFolder);
    // this.myEmails.indexOf(email);
    this.myUser = await this.myBECaller.deleteAnEmail(
      this.myUser,
      this.myUser.folders.indexOf(this.selectedFolder),
      this.myEmails.indexOf(email)
    );
    console.log("Reached Here1");
    this.reloadPage();
    console.log("Reached Here2");
    this.resetSelectedEmail();
    console.log("Reached Here3");
    this.selectFolder(this.myUser.folders.indexOf(this.selectedFolder));
    console.log("Reached Here4");
    console.log(this.selectedFolder);
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
    const elem = document.getElementById('content');
    if (elem == null) return;
    elem.innerHTML = '';
    // ------------------- Separator -------------------
    let composeEmailDiv = document.createElement('div');
    composeEmailDiv.classList.add('composeEmail');
    // ------------------- Separator -------------------
    // <div class="from" >
    //     <div>From:</div>
    //     <input disabled type="email" placeholder="userAccount@mail.com"">
    // </div>
    let fromDiv = document.createElement('div');
    fromDiv.classList.add('from');
    let fromInnerDiv = document.createElement('div');
    let fromInput = document.createElement('input');
    fromInput.disabled = true;
    fromInput.type = 'email';
    fromInput.id = 'fromInputId';
    fromInput.value = this.myUser.emailAddress;
    fromInput.placeholder = 'userAccount@csedmail.com';
    fromInnerDiv.appendChild(document.createTextNode('From:'));
    fromDiv.appendChild(fromInnerDiv);
    fromDiv.appendChild(fromInput);
    composeEmailDiv.appendChild(fromDiv);
    // ------------------- Separator -------------------
    // <div class="to">
    //     <div>To:</div>
    //     <input type="email" placeholder="JohnDoe@mail.com">
    // </div>
    let toDiv = document.createElement('div');
    toDiv.classList.add('to');
    toDiv.id = 'To';
    let toInnerDiv = document.createElement('div');
    let toInput = document.createElement('input');
    toInput.type = 'email';
    toInput.id = 'toInputId';
    // toInput.list = 'receiver';
    toInput.setAttribute('list', 'receiver');
    toInput.placeholder = 'JohnDoe@csedmail.com';
    toInnerDiv.appendChild(document.createTextNode('To:'));
    toDiv.appendChild(toInnerDiv);
    toDiv.appendChild(toInput);
    composeEmailDiv.appendChild(toDiv);
    toInput.addEventListener('input', (func) => {
      this.recievers();
    });
    // ------------------- Separator -------------------
    // <div class="subject">
    //   <div>Subject:</div>
    //   <input type="text" placeholder="Email Subject">
    // </div>
    let subjectDiv = document.createElement('div');
    subjectDiv.classList.add('subject');
    let subjectInnerDiv = document.createElement('div');
    let subjectInput = document.createElement('input');
    subjectInput.type = 'text';
    subjectInput.id = 'subjectInputId';
    subjectInput.placeholder = 'Email Subject';
    subjectInnerDiv.appendChild(document.createTextNode('Subject:'));
    subjectDiv.appendChild(subjectInnerDiv);
    subjectDiv.appendChild(subjectInput);
    composeEmailDiv.appendChild(subjectDiv);
    // ------------------- Separator -------------------
    // <div class="body">
    //     <div>Body:</div>
    //     <textarea style="font-size: 17px;"></textarea>
    //     <div class="sendB">
    //       <button>
    //         SEND
    //       </button>
    //     </div>
    // </div>
    let bodyDiv = document.createElement('div');
    bodyDiv.classList.add('body');
    let bodyInnerDiv = document.createElement('div');
    bodyInnerDiv.appendChild(document.createTextNode('Body:'));
    let bodyText = document.createElement('textarea');
    bodyText.style.fontSize = '17px';
    bodyText.id = 'bodyInputId';
    let buttonDiv = document.createElement('div');
    buttonDiv.classList.add('sendB');
    let buttonElement = document.createElement('button');
    buttonElement.appendChild(document.createTextNode('SEND'));
    buttonElement.addEventListener('click', (func) => {
      this.sendTheEmail();
    });
    buttonDiv.appendChild(buttonElement);
    bodyDiv.appendChild(bodyInnerDiv);
    bodyDiv.appendChild(bodyText);
    bodyDiv.appendChild(buttonDiv);
    composeEmailDiv.appendChild(bodyDiv);
    // ------------------- Separator -------------------
    // <div>
    //     <div>Attachments:</div>
    //     <div class="attachmentsHolder">
    //       <div>
    //       <button onclick="document.getElementById('fileUpload').click()">Attach</button>
    //       <input type="file" id = "fileUpload" multiple style="visibility: hidden;">
    //       </div>
    //       <div id="attachedFiles"></div>
    //     </div>
    // </div>
    let attachmentsDiv = document.createElement('div');
    let attachmentInnerDiv = document.createElement('div');
    attachmentInnerDiv.appendChild(document.createTextNode('Attachments:'));
    let attachmentsHolderDiv = document.createElement('div');
    attachmentsHolderDiv.classList.add('attachmentsHolder');
    let tempDiv = document.createElement('div');
    let tempButton = document.createElement('button');
    tempButton.appendChild(document.createTextNode('Attach'));
    tempButton.addEventListener('click', (func) => {
      document.getElementById('fileUpload')?.click();
    });
    tempDiv.appendChild(tempButton);
    let attachmentsFileInput = document.createElement('input');
    attachmentsFileInput.type = 'file';
    attachmentsFileInput.id = 'fileUpload';
    attachmentsFileInput.multiple = true;
    attachmentsFileInput.style.visibility = 'hidden';
    tempDiv.appendChild(attachmentsFileInput);
    attachmentsHolderDiv.appendChild(tempDiv);
    let attachedFilesDiv = document.createElement('div');
    attachedFilesDiv.id = 'attachedFiles';
    attachmentsHolderDiv.appendChild(attachedFilesDiv);
    attachmentsDiv.appendChild(attachmentInnerDiv);
    attachmentsDiv.appendChild(attachmentsHolderDiv);
    composeEmailDiv.appendChild(attachmentsDiv);
    // ------------------- Separator -------------------
    elem.appendChild(composeEmailDiv);

    // elem.innerHTML += `
    // <div class="composeEmail">
    //   <div class="from" >
    //     <div>From:</div>
    //     <input disabled type="email" placeholder="userAccount@mail.com"">
    //   </div>
    //   <div class="to">
    //     <div>To:</div>
    //     <input type="email" placeholder="JohnDoe@mail.com">
    //   </div>
    //   <div class="subject">
    //   <div>Subject:</div>
    //   <input type="text" placeholder="Email Subject">
    //   </div>
    //   <div class="body">
    //     <div>Body:</div>
    //     <textarea style="font-size: 17px;"></textarea>
    //     <div class="sendB">
    //       <button>
    //         SEND
    //       </button>
    //     </div>
    //   </div>
    //   <div>
    //     <div>Attachments:</div>
    //     <div class="attachmentsHolder">
    //       <div>
    //       <button onclick="document.getElementById('fileUpload').click()">Attach</button>
    //       <input type="file" id = "fileUpload" multiple style="visibility: hidden;">
    //       </div>
    //       <div id="attachedFiles"></div>
    //     </div>
    //   </div>
    // </div>
    // `;
    let tempInput = document.getElementById('fileUpload');
    tempInput?.addEventListener('change', (event) => {
      this.onFileSelected(event);
    });
  }
  // -------------- Separator --------------
  recievers() {
    console.log('in receivers');
    let toEmails = [];
    let myContacts: Contact[] = this.myUser.contacts;
    for (let contact of myContacts) {
      for (let email of contact.emails) {
        toEmails.push(email);
      }
    }
    let div = document.getElementById('To');
    if (!div) return;
    // div.innerHTML += `
    // <div>To:</div>
    // <input type="email" placeholder="JohnDoe@mail.com" list="receiver">
    // `;
    let tempData = document.createElement('datalist');
    tempData.id = 'receiver';
    for (let email of toEmails) {
      let tempOption = document.createElement('option');
      tempOption.value = email;
      tempData.appendChild(tempOption);
    }
    div.appendChild(tempData);
  }
  // -------------- Separator --------------
  refreshMailBox() {
    this.selectFolder(this.myUser.folders.indexOf(this.selectedFolder));
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
  // generateMails() {
  //   this.myEmails.push({
  //     sender: 'UserA',
  //     receiver: 'UserB',
  //     subject: 'Party Invitation',
  //     body: "Hey UserB, I'd like to invite you to my birthday party next tuesday morning at 12:00 AM, kindly check the invitation card at the attachments section.",
  //     attachments: [{ Name: 'Invitation Card', 'Card Number': '#22342342' }],
  //   });
  //   this.myEmails.push({
  //     sender: 'UserX',
  //     receiver: 'UserB',
  //     subject: 'Wedding Invitation',
  //     body: "Hey UserB, I'd like to invite you to my wedding party next thursday morning at 12:00 AM, kindly check the invitation card at the attachments section.",
  //     attachments: [{ Name: 'Invitation Card', 'Card Number': '#654651' }],
  //   });
  //   this.myEmails.push({
  //     sender: 'UserZ',
  //     receiver: 'UserY',
  //     subject: 'Wedding Invitationnnn',
  //     body: "Hey UserB, I'd like to invite you to my wedding party next thursday morning at 12:00 AM, kindly check the invitation card at the attachments section.",
  //     attachments: [{ Name: 'Invitation Card', 'Card Number': '#654651' }],
  //   });
  //   this.myEmails.push({
  //     sender: 'UserZ',
  //     receiver: 'UserY',
  //     subject: 'Wedding Invitationnnn',
  //     body: "Hey UserB, I'd like to invite you to my wedding party next thursday morning at 12:00 AM, kindly check the invitation card at the attachments section.",
  //     attachments: [{ Name: 'Invitation Card', 'Card Number': '#654651' }],
  //   });
  // }
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
    this.attachedFiles = fileNames;
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
  ContactsInfo() {
    console.log('Going to contacts');
    this._router.navigate(['Contacts'], {
      queryParams: { userObj: JSON.stringify(this.myUser) },
    });
  }
  // -------------- Separator --------------
  reloadPage() {
    this._router.navigate(['ViewEmails'], {
      queryParams: { userObj: JSON.stringify(this.myUser) },
      replaceUrl: true,
    });
    this.refreshMailBox();
  }
  // -------------- Separator --------------
  async sendTheEmail() {
    let emailBuilder: EmailBuilderService = new EmailBuilderService();
    let tempContent = document.getElementById(
      'fromInputId'
    ) as HTMLInputElement;
    emailBuilder.buildSender(tempContent.value);
    tempContent = document.getElementById('toInputId') as HTMLInputElement;
    emailBuilder.buildReceiver(tempContent.value);
    tempContent = document.getElementById('subjectInputId') as HTMLInputElement;
    emailBuilder.buildSubject(tempContent.value);
    emailBuilder.buildAttachments(this.attachedFiles);
    let bodyContent = document.getElementById(
      'bodyInputId'
    ) as HTMLTextAreaElement;
    emailBuilder.buildBody(bodyContent.value);
    this.myUser = await this.myBECaller.sendAnEmail(
      this.myUser,
      emailBuilder.buildEmail()
    );
    this.reloadPage();
  }
  // -------------- Separator --------------
}
