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
  public myUser!: User;
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
    }
  }
  // -------------- Separator --------------
  showEmails(emails: Email[]) {
    const tempEmailsHolder = document.getElementById('emailsHolder');
    if (!tempEmailsHolder) return;
    tempEmailsHolder.innerHTML = ``;
    if (emails.length > 3) tempEmailsHolder.style.overflowY = 'scroll';
    else tempEmailsHolder.style.overflowY = 'hidden';
    if (emails.length <= 0) return;
    for (let email of emails) {
      tempEmailsHolder.innerHTML += `<div>${email.subject}</div>`;
      tempEmailsHolder.lastElementChild?.classList.add('emailSubj');
    }
    for (let i = 0; i < tempEmailsHolder.children.length; i++) {
      let tempButtonsHolder = document.createElement('div');
      let tempViewButtonElement = document.createElement('button');
      tempViewButtonElement.appendChild(document.createTextNode('View'));
      tempViewButtonElement.addEventListener('click', (func3) => {
        this.selectEmail(emails[i]);
      });
      let tempDeleteButtonElement = document.createElement('button');
      tempDeleteButtonElement.appendChild(document.createTextNode('Delete'));
      tempDeleteButtonElement.addEventListener('click', (func2) => {
        this.deleteEmail(emails[i]);
      });
      let tempMoveButtonElement = document.createElement('button');
      tempMoveButtonElement.appendChild(document.createTextNode('Move'));
      tempMoveButtonElement.addEventListener('click', (func4) => {
        this.showMovingPage(emails[i]);
      });
      tempButtonsHolder.appendChild(tempViewButtonElement);
      tempButtonsHolder.appendChild(tempMoveButtonElement);
      tempButtonsHolder.appendChild(tempDeleteButtonElement);
      tempEmailsHolder.children[i].appendChild(tempButtonsHolder);
    }
  }
  // -------------- Separator --------------
  selectFolder(folderIndex: any) {
    this.selectedFolder = this.myUser.folders[folderIndex];
    this.resetSelectedEmail();
    if (this.myUser.folders[folderIndex].emails.length > 0) {
      this.myEmails = this.myUser.folders[folderIndex].emails;
    } else this.myEmails = [];
    this.showEmails(this.myEmails);
  }
  // -------------- Separator --------------
  async deleteEmail(email: Email) {
    this.myUser = await this.myBECaller.deleteAnEmail(
      this.myUser,
      this.findFolderIndex(this.selectedFolder),
      this.findEmailIndex(email)
    );
    await this.reloadPage();
    this.resetSelectedEmail();
    this.selectFolder(this.myUser.folders.indexOf(this.selectedFolder));
  }
  // -------------- Separator --------------
  selectEmail(email: Email) {
    this.selectedEmail = email;
    if (this.selectedFolder.name == 'Draft') {
      this.compose_email(email);
      return;
    }
    const elem = document.getElementById('content');
    if (elem == null) return;
    let priorityString = '';
    if (this.selectedEmail.priority == 1) {
      priorityString = 'Low Priority';
    } else if (this.selectedEmail.priority == 2) {
      priorityString = 'Medium Priority';
    } else if (this.selectedEmail.priority == 3) {
      priorityString = 'Top Priority';
    } else if (this.selectedEmail.priority == 4) {
      priorityString = 'Critical';
    }
    elem.innerHTML = `
    <div class="composeEmail">
      <div>
        <div>From:</div>
        <input value="${this.selectedEmail.sender}" disabled type="email">
      </div>
      <div>
        <div>Priority:</div>
        <input value="${priorityString}" disabled type="text">
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
          <div id="attachedFiles">
          </div>
        </div>
      </div>
    </div>
    `;
    let tempInput = document.getElementById('fileUpload');
    tempInput?.addEventListener('change', (event) => {
      this.onFileSelected(event);
    });
    let attachDiv = document.getElementById('attachedFiles');
    for (let i = 0; i < email.attachments.length; i++) {
      let tempDiv = document.createElement('div');
      let tempPar = document.createElement('p');
      tempPar.appendChild(
        document.createTextNode(this.selectedEmail.attachments[i])
      );
      tempDiv.appendChild(tempPar);
      tempDiv.classList.add('attachment');
      tempPar.id = 'downloadFile';
      tempPar.addEventListener('click', (func) => {
        this.fileUploadDownload.onDownloadFile(
          this.selectedEmail.attachments[i]
        );
      });
      attachDiv?.appendChild(tempDiv);
    }
  }
  // -------------- Separator --------------
  compose_email(draftedEmail?: Email) {
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
    // </div>
    //   <select name="priority" id="priority">
    //     <option value="4">Critical</option>
    //     <option value="3">Top Priority</option>
    //     <option value="2">Medium Priority</option>
    //     <option value="1">Low Priority</option>
    //   </select>
    // </div>
    let priorityDiv = document.createElement('div');
    priorityDiv.classList.add('priority');
    priorityDiv.id = 'Priority';
    let PriorityInnerDiv = document.createElement('div');
    PriorityInnerDiv.appendChild(document.createTextNode('Priority Level:'));
    let selectPriority = document.createElement('select');
    selectPriority.id = 'priority';
    selectPriority.name = 'priority';

    let optionPriority4 = document.createElement('option');
    optionPriority4.value = '4';
    optionPriority4.appendChild(document.createTextNode('Critical'));
    selectPriority.appendChild(optionPriority4);

    let optionPriority3 = document.createElement('option');
    optionPriority3.value = '3';
    optionPriority3.appendChild(document.createTextNode('Top Priority'));
    selectPriority.appendChild(optionPriority3);
    priorityDiv.appendChild(PriorityInnerDiv);

    let optionPriority2 = document.createElement('option');
    optionPriority2.value = '2';
    optionPriority2.appendChild(document.createTextNode('Medium Priority'));
    selectPriority.appendChild(optionPriority2);

    let optionPriority1 = document.createElement('option');
    optionPriority1.value = '1';
    optionPriority1.appendChild(document.createTextNode('Low Priority'));
    selectPriority.appendChild(optionPriority1);
    priorityDiv.appendChild(selectPriority);
    composeEmailDiv.appendChild(priorityDiv);
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
    //     <div class="sendSave">
    //       <button>
    //         SEND
    //       </button>
    //       <button>
    //         SAVE
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
    buttonDiv.classList.add('sendSave');
    let DraftButton = document.createElement('button');
    DraftButton.appendChild(document.createTextNode('DRAFT'));
    DraftButton.addEventListener('click', async () => {
      if (draftedEmail !== undefined) {
        let oldEmailIndex = this.findEmailIndex(draftedEmail);
        await this.sendToDraft(oldEmailIndex);
      } else {
        await this.sendToDraft(-1);
      }
    });
    buttonDiv.appendChild(DraftButton);
    let sendButton = document.createElement('button');
    sendButton.appendChild(document.createTextNode('SEND'));
    sendButton.addEventListener('click', async (func) => {
      this.sendTheEmail();
    });
    buttonDiv.appendChild(sendButton);
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

    let tempInput = document.getElementById('fileUpload');
    tempInput?.addEventListener('change', (event) => {
      this.onFileSelected(event);
    });
    this.attachedFiles.splice(0, this.attachedFiles.length);
    // --------------------------
    if (draftedEmail !== undefined) {
      let tempTo = document.getElementById('toInputId') as HTMLInputElement;
      tempTo.value = draftedEmail.receiver;
      let tempSubject = document.getElementById(
        'subjectInputId'
      ) as HTMLInputElement;
      tempSubject.value = draftedEmail.subject;
      let tempPriority = document.getElementById(
        'priority'
      ) as HTMLSelectElement;
      tempPriority.value = String(draftedEmail.priority);
      let tempBody = document.getElementById(
        'bodyInputId'
      ) as HTMLTextAreaElement;
      tempBody.value = draftedEmail.body;
      this.attachedFiles.splice(0, this.attachedFiles.length);
      this.attachedFiles = draftedEmail.attachments;
      this.showFilesAttached(this.attachedFiles);
    }
  }
  // -------------- Separator --------------
  async sendToDraft(draftedIndex: number) {
    let builtEmail = this.buildMyEmail();
    let DraftFolderNumber = 4;
    if (this.selectedFolder.name === 'Draft') {
      this.myUser.folders[DraftFolderNumber].emails.splice(draftedIndex, 1);
    }
    this.myUser.folders[DraftFolderNumber].emails.push(builtEmail);
    this.myUser = await this.myBECaller.updateUserData(this.myUser);
    await this.reloadPage();
  }
  // -------------- Separator --------------
  recievers() {
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
  async refreshMailBox() {
    this.myUser = await this.myBECaller.fetchUser(this.myUser);
    this.selectFolder(this.findFolderIndex(this.selectedFolder));
    this.resetSelectedEmail();
  }
  // -------------- Separator --------------
  findFolderIndex(folder: Folder) {
    for (let i = 0; i < this.myUser.folders.length; i++) {
      if (this.myUser.folders[i].name == folder.name) return i;
    }
    console.log('Folder not found');
    return -1;
  }
  // -------------- Separator --------------
  resetSelectedEmail() {
    this.selectedEmail = {
      sender: 'NA',
      receiver: 'NA',
      subject: 'NA',
      body: 'NA',
      attachments: [],
      priority: 3,
    };
    const elem = document.getElementById('content');
    if (elem) elem.innerHTML = ``;
  }
  // -------------- Separator --------------
  onFileSelected(event: any) {
    let selectedFiles = event.target.files;
    let fileArray: File[] = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      fileArray[i] = selectedFiles[i];
      this.attachedFiles.push(fileArray[i].name);
    }
    this.fileUploadDownload.onUploadFiles(fileArray);
    this.showFilesAttached(this.attachedFiles);
  }
  // -------------- Separator --------------
  showFilesAttached(fileNames: string[]) {
    let attachmentsHolder = document.getElementById('attachedFiles');
    if (attachmentsHolder) attachmentsHolder.innerHTML = ``;
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
        this.attachedFiles=fileNames;
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
      await this.reloadPage();
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
    this._router.navigate(['Contacts'], {
      queryParams: { userObj: JSON.stringify(this.myUser) },
    });
  }
  // -------------- Separator --------------
  async reloadPage() {
    this._router.navigate(['ViewEmails'], {
      queryParams: { userObj: JSON.stringify(this.myUser) },
      replaceUrl: true,
    });
    await this.refreshMailBox();
    this.generateFolders();
  }
  // -------------- Separator --------------
  buildMyEmail() {
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
    let selectPrior = document.getElementById('priority') as HTMLSelectElement;
    emailBuilder.buildPriority(Number(selectPrior.value));
    emailBuilder.buildBody(bodyContent.value);
    return emailBuilder.buildEmail();
  }
  // -------------- Separator --------------
  async sendTheEmail() {
    let myBuiltEmail = this.buildMyEmail();
    console.log('In sendTheEmail: Folder name:', this.selectedFolder.name);
    if (this.selectedFolder.name === 'Draft') {
      let emailIndex = this.findEmailIndex(myBuiltEmail);
      this.selectedFolder.emails.splice(emailIndex, 1);
    }
    this.myUser = await this.myBECaller.sendAnEmail(this.myUser, myBuiltEmail);
    await this.reloadPage();
  }
  // -------------- Separator --------------
  async deleteFolder() {
    let folderIndex: number = this.findFolderIndex(this.selectedFolder);
    if (folderIndex > 4) {
      this.myUser = await this.myBECaller.deleteFolder(
        this.myUser,
        folderIndex
      );
      this.selectFolder(0);
      await this.reloadPage();
    } else alert("Default Folders Can't Be Deleted");
  }
  // -------------- Separator --------------
  findEmailIndex(email: Email) {
    for (let i = 0; i < this.selectedFolder.emails.length; i++) {
      if (
        this.selectedFolder.emails[i].subject == email.subject &&
        this.selectedFolder.emails[i].body == email.body &&
        this.selectedFolder.emails[i].sender === email.sender &&
        this.selectedFolder.emails[i].receiver == email.receiver
      )
        return i;
    }
    console.log('Emails Was not found using the findEmailIndex Method');
    return -1;
  }
  // -------------- Separator --------------
  async moveEmail(email: Email) {
    let emailIndex = this.findEmailIndex(email);
    let fromFolderIndex = this.findFolderIndex(this.selectedFolder);
    let tempSelectButton = document.getElementById(
      'newFolder'
    ) as HTMLSelectElement;
    let toFolderIndex = Number(tempSelectButton.value);
    this.myUser = await this.myBECaller.moveEmail(
      this.myUser,
      fromFolderIndex,
      toFolderIndex,
      emailIndex
    );
    this.selectFolder(this.findFolderIndex(this.selectedFolder));
    this.resetSelectedEmail();
    await this.reloadPage();
    this.cancelMoving();
  }
  // -------------- Separator --------------
  cancelMoving() {
    let tempDiv = document.getElementById('movingEmailDiv') as HTMLDivElement;
    tempDiv.style.visibility = 'hidden';
  }
  // -------------- Separator --------------
  showMovingPage(email: Email) {
    // let emailIndex = this.findEmailIndex(email);
    let tempDiv = document.getElementById('movingEmailDiv') as HTMLDivElement;
    tempDiv.style.visibility = 'visible';
    let tempButton = document.getElementById(
      'movingEmailButton'
    ) as HTMLButtonElement;
    tempButton.addEventListener('click', (func) => {
      this.moveEmail(email);
    });
    let tempSelectButton = document.getElementById(
      'newFolder'
    ) as HTMLSelectElement;
    tempSelectButton.innerHTML = '';
    for (let i = 0; i < this.myUser.folders.length; i++) {
      if (
        this.myUser.folders[i] == this.selectedFolder ||
        this.myUser.folders[i].name == 'Inbox' ||
        this.myUser.folders[i].name == 'Sent' ||
        this.myUser.folders[i].name == 'Draft'
      )
        continue;
      let tempOption = document.createElement('option');
      tempOption.appendChild(
        document.createTextNode(this.myUser.folders[i].name)
      );
      tempOption.value = String(i);
      tempSelectButton.appendChild(tempOption);
    }
  }
  // -------------- Separator --------------
  logout() {
    this.myBECaller.signOut(this.myUser);
    // Implement Routing To the landing page
    this._router.navigate([''], {
      replaceUrl: true,
    });
  }
  // -------------- Separator --------------
  async sortFolderEmails() {
    let dateInput = document.getElementById('DateCheckBox') as HTMLInputElement;
    let dateFlag = dateInput.checked;
    let ImportanceInput = document.getElementById(
      'ImportanceCheckBox'
    ) as HTMLInputElement;
    let impFlag = ImportanceInput.checked;
    let folderIndex: number = this.findFolderIndex(this.selectedFolder);
    let flag = false;
    if (!dateFlag && impFlag) {
      flag = false;
      this.myUser = await this.myBECaller.reqSortEmails(
        folderIndex,
        flag,
        this.myUser
      );
    } else if (!impFlag && dateFlag) {
      flag = true;
      this.myUser = await this.myBECaller.reqSortEmails(
        folderIndex,
        flag,
        this.myUser
      );
    } else {
    }
    this.selectFolder(folderIndex);
    await this.reloadPage();
  }
  // -------------- Separator --------------
  async searchEmails() {
    let tempSelectElement = document.getElementById(
      'indicator'
    ) as HTMLSelectElement;
    let tempInputElement = document.getElementById(
      'site-search'
    ) as HTMLInputElement;
    let searchBasedOn;
    switch (tempSelectElement.value) {
      case 'subject': {
        searchBasedOn = 0;
        break;
      }
      case 'sender': {
        searchBasedOn = 1;
        break;
      }
      case 'receiver': {
        searchBasedOn = 2;
        break;
      }
      case 'body': {
        searchBasedOn = 3;
        break;
      }
      default: {
        searchBasedOn = 0;
        ('Non valid search based on.');
        break;
      }
    }
    let searchAbout = tempInputElement.value;
    let FolderIndex = this.findFolderIndex(this.selectedFolder);
    this.showEmails(
      await this.myBECaller.searchEmails(
        this.myUser,
        FolderIndex,
        searchBasedOn,
        searchAbout
      )
    );
  }
  // -------------- Separator --------------
  async renameFolder() {
    if (
      this.selectedFolder.name == 'Inbox' ||
      this.selectedFolder.name == 'Sent' ||
      this.selectedFolder.name == 'Trash' ||
      this.selectedFolder.name == 'Draft' ||
      this.selectedFolder.name == 'Starred'
    ) {
      alert("Default Folder Name Can't Be Changed.");
      return;
    }
    let tempInputElement = document.getElementById(
      'newFolderNameID'
    ) as HTMLInputElement;
    let newName = tempInputElement.value;
    for (let i = 0; i < this.myUser.folders.length; i++) {
      if (this.myUser.folders[i].name == newName) {
        alert('Folder name is already taken');
        return;
      }
    }
    let tempIndex = this.findFolderIndex(this.selectedFolder);
    this.myUser = await this.myBECaller.renameFolder(
      this.myUser,
      this.findFolderIndex(this.selectedFolder),
      newName
    );
    this.generateFolders();
    this.selectFolder(tempIndex);
    await this.reloadPage();
  }
  // -------------- Separator --------------
}
