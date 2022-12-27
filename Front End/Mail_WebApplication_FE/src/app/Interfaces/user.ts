import { Folder } from './folder';

export interface User {
  _id: string;
  emailAddress: string;
  emailPassword: string;
  folders: Folder[];
}
