import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { User } from '../Interfaces/user';
import { Contact } from '../Interfaces/contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ContactsComponent implements OnInit {
  private myUser!: User;
  private myContacts!:Contact[];
  // -------------- Separator --------------
  constructor( private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      this.myUser = JSON.parse(params['userObj']);
    });
    console.log(this.myUser);
    this.myContacts=this.myUser.contacts;
   }

  ngOnInit(): void {
    this.generateMails();
    this.viewContacts();
  }
  viewContacts(){
    const tempEmailsHolder = document.getElementById('contactsViewId');
    if (!tempEmailsHolder) return;
    tempEmailsHolder.innerHTML = ``;
    for (let contact of this.myContacts) {
      tempEmailsHolder.innerHTML += `<div>${contact.name} : ${contact.emails[0]}</div>`;
      tempEmailsHolder.lastElementChild?.classList.add('contactInfo');
    }
    for (let i = 0; i < tempEmailsHolder.children.length; i++) {
      let tempButtonsHolder = document.createElement('div');
      let tempEditButtonElement = document.createElement('button');
      tempEditButtonElement.appendChild(document.createTextNode('Edit'));
      tempEditButtonElement.addEventListener('click', (func1) => {
        this.editContact(this.myContacts[i]);
      });
      let tempDeleteButtonElement = document.createElement('button');
      tempDeleteButtonElement.appendChild(document.createTextNode('Delete'));
      tempDeleteButtonElement.addEventListener('click', (func2) => {
        this.deletContact(this.myContacts[i]);
      });
      let tempViewButtonElement = document.createElement('button');
      tempViewButtonElement.appendChild(document.createTextNode('View'));
      tempViewButtonElement.addEventListener('click', (func3) => {
        this.ViewContact(this.myContacts[i]);
      });
      tempButtonsHolder.appendChild(tempViewButtonElement);
      tempButtonsHolder.appendChild(tempDeleteButtonElement);
      tempButtonsHolder.appendChild(tempEditButtonElement);
      tempEmailsHolder.children[i].appendChild(tempButtonsHolder);
    }
  }
  
  createContact(){
    const elem = document.getElementById('contactDetailsId');
    if (elem == null) return;
    elem.innerHTML = `
      <div class="Name" >
        <div>Name:</div>
        <input type="text" placeholder="John">
      </div>
    `;
      elem.innerHTML += 
      `<div id ="Emails"> Emails:
        <input type="email" placeholder="John@ac.com"">
      </div>`;
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
      elem.appendChild(tempButtonsHolder)
  
  }

  editContact(contact:any){
  }
  
  deletContact(contact:any){
  }
  
  ViewContact(contact:any){
  }

  generateMails() {
    this.myUser.contacts.push({
      name:"hi",
      emails:["hi@.com","by@.com"]
    });
    this.myUser.contacts.push({
      name:"bye",
      emails:["go@.com","come@.com"]
    });
  }
}
