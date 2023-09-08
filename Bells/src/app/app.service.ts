import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

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

    getCSVFiles(files: any[]): Observable<Blob[]> {
      return forkJoin(
        files.map((file: string) => this.getFile(file)));
    }

    getFile(file: string) {
      return this.http.get(file, { responseType: 'blob' });
    }
}
