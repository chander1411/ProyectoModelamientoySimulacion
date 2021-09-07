import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class CuadmediosService {
    private url = 'http://34.67.213.198:3000/api/numerosAleatorios/cuadradosMedios/';
    constructor(private http: HttpClient) {
    }
    public subirArchivo(datos: string): Observable<any> {
        return this.http.get(this.url + datos);
    }
}