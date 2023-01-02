import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSerializer } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { User } from '../Interfaces/user';
import { Contact } from '../Interfaces/contact';
import { saveAs } from 'file-saver';
import { BackEndCallerService } from '../Services/back-end-caller.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ContactsComponent implements OnInit {
  private myBECaller: BackEndCallerService;
  private myUser!: User;
  private myContacts!:Contact[];
  // -------------- Separator --------------
  constructor(private http: HttpClient, private route: ActivatedRoute, private _router: Router) {
    this.myBECaller = new BackEndCallerService(this.http);
    this.route.queryParams.subscribe((params) => {
      this.myUser = JSON.parse(params['userObj']);
    });
    console.log("In constructor");
    console.log(this.myUser);
    this.myContacts=this.myUser.contacts;
   }

  ngOnInit(): void {
    this.myContacts=this.myUser.contacts;
    console.log("in init");
    console.log(this.myContacts)
    this.view(this.myContacts);
  }

  // viewContacts(){
  //   const tempEmailsHolder = document.getElementById('contactsViewId');
  //   if (!tempEmailsHolder) return;
  //   tempEmailsHolder.innerHTML = ``;
  //   console.log("In viewContacts");
  //   console.log(this.myContacts)
  //   // this.myUser.contacts = this.myContacts;
  //   for (let contact of this.myUser.contacts) {
  //     tempEmailsHolder.innerHTML += `<div>${contact.name} : ${contact.emails[0]}</div>`;
  //     tempEmailsHolder.lastElementChild?.classList.add('contactInfo');
  //   }
  //   for (let i = 0; i < tempEmailsHolder.children.length; i++) {
  //     let tempButtonsHolder = document.createElement('div');
  //     let tempEditButtonElement = document.createElement('button');
  //     tempEditButtonElement.appendChild(document.createTextNode('Edit'));
  //     tempEditButtonElement.addEventListener('click', (func1) => {
  //       this.editContact(this.myContacts[i]);
  //     });
  //     let tempDeleteButtonElement = document.createElement('button');
  //     tempDeleteButtonElement.appendChild(document.createTextNode('Delete'));
  //     tempDeleteButtonElement.addEventListener('click', (func2) => {
  //       this.deletContact(this.myContacts[i]);
  //     });
  //     let tempViewButtonElement = document.createElement('button');
  //     tempViewButtonElement.appendChild(document.createTextNode('View'));
  //     tempViewButtonElement.addEventListener('click', (func3) => {
  //       this.ViewContact(this.myContacts[i]);
  //     });
  //     tempButtonsHolder.appendChild(tempViewButtonElement);
  //     tempButtonsHolder.appendChild(tempDeleteButtonElement);
  //     tempButtonsHolder.appendChild(tempEditButtonElement);
  //     tempEmailsHolder.children[i].appendChild(tempButtonsHolder);
  //   }
  // }
  
  createContact(){
    const elem = document.getElementById('contactDetailsId');
    if (elem == null) return;
    elem.innerHTML = `
      <div class="Name" >
        <div class="Namelabel">Name: </div>
        <input id="cName" type="text" placeholder="John">
      </div>
    `;
      elem.innerHTML += 
      `<div id ="Emails"> Emails:
        <input type="email" placeholder="John@ac.com"">
      </div>`;
      
      let tempdb=document.createElement('div');
      tempdb.classList.add("ButtonsDiv");
      let tempButtonsHolder = document.createElement('div');
      tempButtonsHolder.classList.add('buttonHolder');
      let tempEditButtonElement = document.createElement('button');
      tempEditButtonElement.appendChild(document.createTextNode('+'));
      tempEditButtonElement.addEventListener('click', (func4) => {
        let tempInput = document.createElement('input');
        tempInput.type="email";
        let emailCont = document.getElementById('Emails');
        emailCont?.appendChild(tempInput);
      });

      tempButtonsHolder.appendChild(tempEditButtonElement);
      tempdb.appendChild(tempButtonsHolder);
      elem.appendChild(tempdb);

      let tempSaveD=document.createElement('div');
      let tempSaveB=document.createElement('button');
      tempSaveB.appendChild(document.createTextNode('SAVE'));
      tempSaveB.classList.add("SaveButton");
      tempSaveB.addEventListener('click', (func5) => {
        this.saveContact();
      });
      tempdb.appendChild(tempSaveB);
      tempSaveD.appendChild(tempdb);
      elem.appendChild(tempSaveD);
      this.updateUser();
  }

  editContact(contact:Contact){
    const elem = document.getElementById('contactDetailsId');
    if (elem == null) return;
    elem.innerHTML = `
      <div class="Name" >
        <div class="Namelabel">Name: </div>
        <input id="cName" type="text" value=${contact.name}>
      </div>
    `;
    elem.innerHTML += 
    `<div id ="Emails"> Emails:
    </div>`;
    for(let i=0;i<contact.emails.length;i++){
      let tempInput = document.createElement('input');
      tempInput.type="email";
      tempInput.value=contact.emails[i];
      let emailCont = document.getElementById('Emails');
      emailCont?.appendChild(tempInput);
    }
    let tempdb=document.createElement('div');
    tempdb.classList.add("ButtonsDiv");
    let tempButtonsHolder = document.createElement('div');
      tempButtonsHolder.classList.add('buttonHolder');
      let tempEditButtonElement = document.createElement('button');
      tempEditButtonElement.appendChild(document.createTextNode('+'));
      tempEditButtonElement.addEventListener('click', (func4) => {
        let tempInput = document.createElement('input');
        tempInput.type="email";
        let emailCont = document.getElementById('Emails');
        emailCont?.appendChild(tempInput);
      });
      
      tempButtonsHolder.appendChild(tempEditButtonElement);
      tempdb.appendChild(tempButtonsHolder);
      elem.appendChild(tempdb);

      let tempSaveD=document.createElement('div');
      let tempSaveB=document.createElement('button');
      tempSaveB.appendChild(document.createTextNode('SAVE'));
      tempSaveB.classList.add("SaveButton");
      tempSaveB.addEventListener('click', (func5) => {
        this.edit(contact);
      });
      tempdb.appendChild(tempSaveB);
      tempSaveD.appendChild(tempdb);
      elem.appendChild(tempSaveD);
      this.updateUser();
  }
  
  async deletContact(contact:Contact){
    console.log("in deletContact");
    console.log(contact);

    let i=this.findContactIndex(contact);
    console.log(i);
    this.myUser = await this.myBECaller.deletContact(this.myUser,i);
    this.myContacts=this.myUser.contacts;
    this.view(this.myContacts);
    this.updateUser();
  }
  findContactIndex(contact:Contact) {
    for (let i = 0; i < this.myUser.contacts.length; i++) {
      if (this.myUser.contacts[i].name == contact.name){
        for (let j = 0; j < this.myUser.contacts[i].emails.length; j++) {
          if(this.myUser.contacts[i].emails[j]!== contact.emails[j]) return -1;
        }
        return i;
      }
    }
    console.log('contact not found');
    return -1;
  }
  
  ViewContact(contact:Contact){
    const elem = document.getElementById('contactDetailsId');
    if (elem == null) return;
    elem.innerHTML = `
      <div class="Name" >
        <div class="Namelabel" >Name: </div>
        <input id="cName" type="text" value=${contact.name} disabled>
      </div>
    `;
    elem.innerHTML += 
    `<div id ="Emails"> Emails:
    </div>`;
    for(let i=0;i<contact.emails.length;i++){
      let tempInput = document.createElement('input');
      tempInput.type="email";
      tempInput.disabled=true;
      tempInput.value=contact.emails[i];
      let emailCont = document.getElementById('Emails');
      emailCont?.appendChild(tempInput);
    }
  }

  async saveContact(){
    console.log("in saveContact");
    let Name: string = (document.getElementById('cName') as HTMLInputElement )?.value;
    let data=document.getElementById('Emails') as HTMLDivElement;
    let addresses =[];
    for(let i=0; i<data.children.length;i++){
      addresses.push((data.children[i] as HTMLInputElement).value);
      this.updateUser();
    }
    console.log(addresses);
    console.log(Name);
    let newContact: Contact=  {name:Name,emails:addresses};
    console.log(newContact);
    this.myUser.contacts.push(newContact);
    this.myUser = await this.myBECaller.addNewContact(this.myUser);
    this.myContacts=this.myUser.contacts;
    this.view(this.myContacts);
    const elem = document.getElementById('contactDetailsId');
    if (elem == null) return;
    elem.innerHTML = ``;
    this.updateUser();
  }
  async edit(contact:Contact){
    console.log("in edit");
    await this.deletContact(contact);
    await this.saveContact();
    const elem = document.getElementById('contactDetailsId');
    if (elem == null) return;
    elem.innerHTML = ``;
    console.log("in edit")
    console.log(this.myUser);
    this.updateUser();
  }

  async sortContacts(){
    const elem = document.getElementById('contactDetailsId');
    if (elem == null) return;
    elem.innerHTML = ``;
    this.myUser= await this.myBECaller.sortConts(this.myUser);
    this.myContacts=this.myUser.contacts;
    this.updateUser();
    this.view(this.myContacts);
  }


  async searchContacts(){
    const elem = document.getElementById('contactDetailsId');
    if (elem == null) return;
    elem.innerHTML = ``;

    let key: string = (document.getElementById('site-search') as HTMLInputElement )?.value;
    console.log(key);

    let searchResult:Contact[]=await this.myBECaller.searchConts(this.myUser,key);
    console.log(searchResult);
    this.view(searchResult);
  }


  view(contacs:Contact[]){
    const tempEmailsHolder = document.getElementById('contactsViewId');
    if (!tempEmailsHolder) return;
    tempEmailsHolder.innerHTML = ``;
    console.log("In view");
    for (let contact of contacs) {
      tempEmailsHolder.innerHTML += `<div>${contact.name} : ${contact.emails[0]}</div>`;
      tempEmailsHolder.lastElementChild?.classList.add('contactInfo');
    }
    for (let i = 0; i < tempEmailsHolder.children.length; i++) {
      let tempButtonsHolder = document.createElement('div');
      let tempEditButtonElement = document.createElement('button');
      tempEditButtonElement.appendChild(document.createTextNode('Edit'));
      tempEditButtonElement.addEventListener('click', (func1) => {
        this.editContact(contacs[i]);
      });
      let tempDeleteButtonElement = document.createElement('button');
      tempDeleteButtonElement.appendChild(document.createTextNode('Delete'));
      tempDeleteButtonElement.addEventListener('click', (func2) => {
        this.deletContact(contacs[i]);
      });
      let tempViewButtonElement = document.createElement('button');
      tempViewButtonElement.appendChild(document.createTextNode('View'));
      tempViewButtonElement.addEventListener('click', (func3) => {
        this.ViewContact(contacs[i]);
      });
      tempButtonsHolder.appendChild(tempViewButtonElement);
      tempButtonsHolder.appendChild(tempDeleteButtonElement);
      tempButtonsHolder.appendChild(tempEditButtonElement);
      tempEmailsHolder.children[i].appendChild(tempButtonsHolder);
    }
  }

  updateUser(){
    this._router.navigate(['Contacts'],
     {
      queryParams: { userObj: JSON.stringify(this.myUser) },
      replaceUrl: true,
      queryParamsHandling: "merge"
    });   
  }

  goBack(){
      this._router.navigate(['ViewEmails'],
     {
        queryParams: { userObj: JSON.stringify(this.myUser) },
        replaceUrl: true,
    }); 
  }
}

