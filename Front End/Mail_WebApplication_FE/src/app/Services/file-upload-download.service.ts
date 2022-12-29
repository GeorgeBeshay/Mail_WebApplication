import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class FileUploadDownloadService {

  constructor(private http:HttpClient) { }

  private server = 'http://localhost:8080/callBackEndServer';

  onUploadFiles(fileArray: File[]): void {
    let files = fileArray;
    const formData = new FormData();
    for (const file of files) { formData.append('files', file); }
    this.upload(formData).subscribe(
      event => {
        console.log(event);
        this.resportProgress(event, fileArray[0].name);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  onDownloadFile(filename: string): void {
    console.log(filename);
    this.download(filename).subscribe(
      event => {
        console.log(event);
        this.resportProgress(event, filename);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  deleteAttachement(file: string, filenames: string[]){
    let tempArray: string[] = [];
    for(let i=0;i<filenames.length;i++){
      if(filenames[i] !== file){
        tempArray.push(filenames[i]);
      }
    }
    filenames = tempArray;
    return filenames;
  }

  upload(formData: FormData): Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(`${this.server}/file/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  download(filename: string): Observable<HttpEvent<Blob>> {
    return this.http.get(`${this.server}/file/download/${filename}`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }

  private resportProgress(httpEvent: HttpEvent<string[] | Blob>, fileName: string): void {
    if(httpEvent.type == HttpEventType.ResponseHeader){
      console.log('Header returned', httpEvent);
    }
    else if (httpEvent.type == HttpEventType.Response) {
      if (httpEvent.body instanceof Array) {
        console.log(httpEvent.body);
      } else {
        saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!,
                {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}), fileName);
      }
    }
  }
}
