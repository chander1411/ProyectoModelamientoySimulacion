import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';
import { RegresioncuadraticaService } from './regresioncuadratica.service';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-regresioncuadratica',
  templateUrl: './regresioncuadratica.component.html',
  styleUrls: ['./regresioncuadratica.component.css'],
  providers: [RegresioncuadraticaService]
})
export class RegresioncuadraticaComponent implements OnInit {
  @Input() public modelo: string;
  opciones;
  // Seleccionamos o iniciamos el valor '' del <select>
  opcionSeleccionado: string = '';
  verSeleccion: string = '';
  arrayBuffer: any;
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['index', '', '', 'Resultado'];


  datos: string;
  Form: FormGroup = new FormGroup({});
  columnaxC: FormControl = new FormControl('');
  columnayC: FormControl = new FormControl('');
  llegaronDatos: boolean = false;
  valores: string = ''
  datosImg: string = '';
  graficaImg: string = '';
  constructor(private RegresioncuadraticaService: RegresioncuadraticaService) { }

  ngOnInit(): void {
    this.Form.addControl('columnax', this.columnaxC);
    this.Form.addControl('columnay', this.columnayC);
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
    this.datos = this.Form.value.columnay;
    this.loading = !this.loading;
    console.log(this.file);
    this.RegresioncuadraticaService
      .subirArchivo(this.file!, this.datos)
      .subscribe((resp: any) => {
        console.log(resp);
        const columnaxT = this.Form.value.columnax;
        const columnayT = this.Form.value.columnay
        this.displayedColumns = ['index', columnaxT, columnayT, 'Resultado'];
        this.llegaronDatos = true;
        this.valores = resp.valores;
        this.graficaImg = 'https://mundovirtual.cf/images/' + resp.grafica;
        this.dataSource = resp.dataframe;
        console.log(this.dataSource);
      });
  }

}
