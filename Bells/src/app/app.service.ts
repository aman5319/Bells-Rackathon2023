import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }
  headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  getData() : Observable<any> {
    let url = 'http://localhost:5000/';
    return this.http.get(url);
  }

  postData(params: number[], trainingBatch: string) : Observable<any> {
    return this.http.post('http://localhost:5000/generateSyntheticData?trainingBatch=' + trainingBatch, params);
  }

  getAllFiles(name: string):  Observable<any> {
    return this.http.get('assets\\localData\\' + name);
  }

    downloadFile(url: string) {
      this.http.get(url, {
        responseType: 'blob'
      }).subscribe((r) => {
        saveAs(r, "output.zip");
      });
    }
   
}
