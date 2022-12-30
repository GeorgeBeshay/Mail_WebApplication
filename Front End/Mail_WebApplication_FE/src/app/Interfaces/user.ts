import { Folder } from './folder';
import { Contact } from './contact';

export interface User {
  _id: string;
  emailAddress: string;
  emailPassword: string;
  fullName: string;
  birthDate: Date;
  folders: Folder[];
  contacts: Contact[];
}
