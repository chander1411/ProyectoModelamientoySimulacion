import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';
import { MontecarloService } from './montecarlo.service';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-montecarlo',
  templateUrl: './montecarlo.component.html',
  styleUrls: ['./montecarlo.component.css'],
  providers: [MontecarloService]
})
export class MontecarloComponent implements OnInit {
  opciones;
  // Seleccionamos o iniciamos el valor '' del <select>
  opcionSeleccionado: string = '';
  verSeleccion: string = '';
  arrayBuffer: any;
  displayedColumns1: string[] = [];
  dataSource1 = new MatTableDataSource();
  displayedColumns2: string[] = [];
  dataSource2 = new MatTableDataSource();

  datos: string;
  Form: FormGroup = new FormGroup({});
  columnaxC: FormControl = new FormControl('');
  columnayC: FormControl = new FormControl('');
  columnaprobabilidadesC: FormControl = new FormControl('');
  numerosimulacionesC: FormControl = new FormControl('');
  llegaronDatos: boolean = false;
  valores: string = ''
  datosImg: string = '';
  graficaImg: string = '';
  constructor(private MontecarloService: MontecarloService) { }

  ngOnInit(): void {
    this.Form.addControl('columnax', this.columnaxC);
    this.Form.addControl('columnay', this.columnayC);
    this.Form.addControl('columnaprobabilidades', this.columnaprobabilidadesC);
    this.Form.addControl('numerosimulaciones', this.numerosimulacionesC);
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
    this.datos = this.Form.value.columnax + '/' + this.Form.value.columnay + '/' + this.Form.value.columnaprobabilidades + '/' + this.Form.value.numerosimulaciones;
    this.loading = !this.loading;
    console.log(this.file);
    this.MontecarloService
      .subirArchivo(this.file!, this.datos)
      .subscribe((resp: any) => {
        console.log(resp);
        const columnaxT = this.Form.value.columnax;
        const columnayT = this.Form.value.columnay;
        const columnaprobabilidadesT = this.Form.value.columnaprobabilidades;
        this.displayedColumns1 = [
          columnaxT,
          columnayT,
          columnaprobabilidadesT,
          'FDP',
          'Min',
          'Max',
        ];
        this.displayedColumns2 = ['index', 'Suma de las simulaciones'];
        this.llegaronDatos = true;
        this.graficaImg = 'http://34.67.213.198:3000/images/' + resp.grafico;
        this.dataSource1 = resp.tablaX2;
        this.dataSource2 = resp.sumaSimulaciones;
      });
  }

}
