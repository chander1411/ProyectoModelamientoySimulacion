import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { CuadmediosService } from './cuadmedios.service';

@Component({
  selector: 'app-cuadmedios',
  templateUrl: './cuadmedios.component.html',
  styleUrls: ['./cuadmedios.component.css'],
  providers: [CuadmediosService]
})
export class CuadmediosComponent implements OnInit {
  @Input() public modelo: string;
  datos: string;
  Form: FormGroup = new FormGroup({});
  semillaC: FormControl = new FormControl('');
  cantidadC: FormControl = new FormControl('');
  llegaronDatos: boolean = false;
  datosImg: string = '';
  graficaImg: string = '';
  dataSource: any = [{}];
  displayedColumns: string[] = ['index', 'X2', 'Xi', 'ri'];
  constructor(private CuadmediosService: CuadmediosService) { }

  ngOnInit(): void {
    this.Form.addControl('semilla', this.semillaC);
    this.Form.addControl('cantidad', this.cantidadC);
  }
  loading: boolean = false; // Flag variable

  onUpload() {
    this.datos = this.Form.value.cantidad + '/' + this.Form.value.semilla;
    this.loading = !this.loading;
    this.CuadmediosService
      .subirArchivo(this.datos)
      .subscribe((resp: any) => {
        console.log(resp);
        this.llegaronDatos = true;
        this.dataSource = resp.resultado;
      });
  }

}
