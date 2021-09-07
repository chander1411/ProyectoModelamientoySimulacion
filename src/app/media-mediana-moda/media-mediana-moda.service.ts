import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class MediaMedianaModaService {
  private url = 'https://mundovirtual.cf/api/mmm/';
  constructor(private http: HttpClient) {
  }
  public subirArchivo(archivo: File, datos: string): Observable<any> {
    const formData = new FormData();
    formData.append('datos', archivo, archivo.name);
    return this.http.post(this.url + datos, formData);
  }
}
