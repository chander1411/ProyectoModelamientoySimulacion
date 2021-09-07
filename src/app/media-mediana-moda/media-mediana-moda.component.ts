import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { MediaMedianaModaService } from './media-mediana-moda.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-media-mediana-moda',
  templateUrl: './media-mediana-moda.component.html',
  styleUrls: ['./media-mediana-moda.component.css'],
  providers: [MediaMedianaModaService]
})
export class MediaMedianaModaComponent implements OnInit {
  @Input() public modelo: string;
  opciones;
  // Seleccionamos o iniciamos el valor '' del <select>
  opcionSeleccionado: string = '';
  verSeleccion: string = '';
  arrayBuffer: any;

  datos: string;
  Form: FormGroup = new FormGroup({});
  columnaC: FormControl = new FormControl('');
  llegaronDatos: boolean = false;
  media: string = '';
  mediana: string = '';
  moda: string = '';

  constructor(private MediaMedianaModaService: MediaMedianaModaService) { }


  ngOnInit(): void {
    this.Form.addControl('columna', this.columnaC);
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
    console.log(this.Form.value.columna);
    this.datos = this.Form.value.columna;
    this.loading = !this.loading;
    console.log(this.file);
    this.MediaMedianaModaService
      .subirArchivo(this.file!, this.datos)
      .subscribe((resp: any) => {
        console.log(resp);
        this.llegaronDatos = true;
        this.media = resp.media;
        this.mediana = resp.mediana;
        this.moda = resp.moda;
      });
  }

}
