import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class CuadmediosService {
    private url = 'https://mundovirtual.cf/api/numerosAleatorios/cuadradosMedios/';
    constructor(private http: HttpClient) {
    }
    public subirArchivo(datos: string): Observable<any> {
        return this.http.get(this.url + datos);
    }
}