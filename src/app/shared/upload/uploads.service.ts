import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class UploadsService {
  private url = 'http://localhost:3030/api/';
  constructor( private http: HttpClient) {
  }
  public subirArchivo(archivo: File,modelo:string):Observable<any>{
    const formData = new FormData();
    formData.append('datos',archivo,archivo.name);
    return this.http.post(this.url+modelo,formData);
  }
}