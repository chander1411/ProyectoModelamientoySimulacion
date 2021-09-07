import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class RegresioncuadraticaService {
    private url = 'http://34.67.213.198:3000/api/regresioncuadratica/';
    constructor(private http: HttpClient) {
    }
    public subirArchivo(archivo: File, datos: string): Observable<any> {
        const formData = new FormData();
        formData.append('datos', archivo, archivo.name);
        return this.http.post(this.url + datos, formData);
    }
}