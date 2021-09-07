import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';
import { SuavizamientoService } from './suavizamiento.service';
import * as XLSX from 'xlsx'
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-suavizamiento',
  templateUrl: './suavizamiento.component.html',
  styleUrls: ['./suavizamiento.component.css'],
  providers: [SuavizamientoService]
})
export class SuavizamientoComponent implements OnInit {

  @Input() public modelo: string;
  opciones;
  // Seleccionamos o iniciamos el valor '' del <select>
  opcionSeleccionado: string = '';
  verSeleccion: string = '';
  arrayBuffer: any;

  datos: string;
  Form: FormGroup = new FormGroup({});
  columnatiempoC: FormControl = new FormControl('');
  columnadatosC: FormControl = new FormControl('');
  alfaC: FormControl = new FormControl('');
  llegaronDatos: boolean = false;
  datosImg: string = '';
  graficaImg: string = '';

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['index', '', '', 'SN'];
  constructor(private SuavizamientoService: SuavizamientoService) { }

  ngOnInit(): void {
    this.Form.addControl('columnatiempo', this.columnatiempoC);
    this.Form.addControl('columnadatos', this.columnadatosC);
    this.Form.addControl('alfa', this.alfaC);
  }
  fileName = '';
  file: File | null = null; // Variable to store file
  loading: boolean = false; // Flag variable



  validar(files) {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    console.log(mimeType);
    if (mimeType.match(/application\/vnd.ms-excel/) == null && mimeType.match(/application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet/) == null) {
      Swal.fire({
        'title': 'Error de Archivo',
        'text': 'Debe escojer un archivo de tipo csv o xlsx!!',
        'icon': 'error'
      });
      return;
    }
    else {
      this.file = files[0];
      console.log(this.file)
      let fileReader = new FileReader();
      fileReader.readAsArrayBuffer(this.file);
      fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, { type: "binary" });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        this.opciones = Object.keys(XLSX.utils.sheet_to_json(worksheet)[0]);
        console.log(Object.keys(XLSX.utils.sheet_to_json(worksheet)[0]));
      }
    }
  }
  onUpload() {
    this.datos = this.Form.value.columnatiempo + '/' + this.Form.value.columnadatos + '/' + this.Form.value.alfa;
    this.loading = !this.loading;
    console.log(this.file);
    this.SuavizamientoService
      .subirArchivo(this.file!, this.datos)
      .subscribe((resp: any) => {
        console.log(resp);
        const columnatiempoT = this.Form.value.columnatiempo;
        const columnadatosT = this.Form.value.columnadatos
        this.displayedColumns = ['index', columnatiempoT, columnadatosT, 'SN'];
        this.llegaronDatos = true;
        this.dataSource = resp.datos;
        console.log(this.dataSource);
      });
  }
}
