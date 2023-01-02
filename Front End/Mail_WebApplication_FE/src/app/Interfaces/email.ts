export interface Email {
  sender: string;
  receiver: string;
  subject: string;
  body: string;
  attachments: Object[];
  priority: number;
}
