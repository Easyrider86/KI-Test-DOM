import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend, HttpResponse } from '@angular/common/http';
import { IThreadConfig } from './IThreadConfig';
import FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ThreadConfigService {

  static Settings: IThreadConfig;
  private http: HttpClient;
  constructor(private httpBackEnd: HttpBackend) {
    this.http = new HttpClient(httpBackEnd);
  }
  load() {
    const jsonFile = 'assets/configs/threadConfig.json';
    return new Promise<void>((resolve, reject) => {
      this.http.get(jsonFile).toPromise().then((response: IThreadConfig) => {
        ThreadConfigService.Settings = <IThreadConfig>response;
        resolve();
      }).catch((response: any) => {
        reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
      });
    });
  }

  save(threads: [{ id: string; name: string; }]) {
    console.log("TRY SAVE!!!", JSON.stringify(threads));
    const jsonFile = 'assets/configs/threadConfig.json';
    var blob = new Blob([JSON.stringify(threads)], { type: "application/json" });
    try {
      console.log('BLOB!', blob);
      FileSaver.saveAs(blob, 'threadConfig.json');
      console.log('success!');
    }
    catch (e) {
      console.log(e);
    }
  }
}