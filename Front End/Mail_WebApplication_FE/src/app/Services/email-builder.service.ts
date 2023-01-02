import { Injectable } from '@angular/core';
import { Email } from '../Interfaces/email';

@Injectable({
  providedIn: 'root',
})
export class EmailBuilderService {
  private Sender!: string;
  private Receiver!: string;
  private Subject!: string;
  private Body!: string;
  private Attachments!: string[];
  private Priority!: number;
  
  constructor() {
    this.Sender = 'Default Sender';
    this.Receiver = 'Default Receiver';
    this.Subject = 'Default Subject';
    this.Body = 'Default Body';
    this.Attachments = [];
    this.Priority = 3;
  }
  buildSender(sender: string): EmailBuilderService {
    this.Sender = sender;
    return this;
  }
  buildReceiver(receiver: string): EmailBuilderService {
    this.Receiver = receiver;
    return this;
  }
  buildSubject(subject: string): EmailBuilderService {
    this.Subject = subject;
    return this;
  }
  buildBody(body: string): EmailBuilderService {
    this.Body = body;
    return this;
  }
  buildAttachments(attachs: string[]): EmailBuilderService {
    this.Attachments = attachs;
    return this;
  }
  buildPriority(prior: number){
    this.Priority = prior;
    return this;
  }
  buildEmail(): Email {
    let concreteEmail: Email = {
      sender: this.Sender,
      receiver: this.Receiver,
      subject: this.Subject,
      body: this.Body,
      attachments: this.Attachments,
      priority: this.Priority,
    };
    return concreteEmail;
  }
}
