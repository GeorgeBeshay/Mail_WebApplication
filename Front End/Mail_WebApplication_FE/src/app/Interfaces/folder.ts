import { Email } from './email';

export interface Folder {
  name: string;
  emails: Email[];
}
