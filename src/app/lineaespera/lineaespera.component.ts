import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { LineaesperaService } from './lineaespera.service';


@Component({
  selector: 'app-lineaespera',
  templateUrl: './lineaespera.component.html',
  styleUrls: ['./lineaespera.component.css'],
  providers: [LineaesperaService]
})
export class LineaesperaComponent implements OnInit {
  @Input() public modelo: string;
  datos: string;
  Form: FormGroup = new FormGroup({});
  data: any = {
    demandP1: "0.0",
    demandP2: "0.0",
    demandP3: "0.0",
    leadTimeP1: "0.0",
    leadTimeP2: "0.0",
    leadTimeP3: "0.0",

  };
  lambdaC: FormControl = new FormControl('');
  nuC: FormControl = new FormControl('');



  llegaronDatos: boolean = false;
  grafica: string = '';
  dataSource1: any = [{}];
  dataSource2: any = [{}];
  displayedColumns1 = [
    'A_LLEGADA',
    'A_SERVICIO',
    'TIE_LLEGADA',
    'TIE_SERVICIO',
    'TIE_EXACTO_LLEGADA',
    'TIE_INI_SERVICIO',
    'TIE_FIN_SERVICIO',
    'TIE_ESPERA',
    'TIE_EN_SISTEMA'
  ];
  displayedColumns2 = [
    'CATEGORIAS',
    'A_LLEGADA',
    'A_SERVICIO',
    'TIE_LLEGADA',
    'TIE_SERVICIO',
    'TIE_EXACTO_LLEGADA',
    'TIE_INI_SERVICIO',
    'TIE_FIN_SERVICIO',
    'TIE_ESPERA',
    'TIE_EN_SISTEMA'
  ];

  categorias: any = ['count', 'mean', 'std', 'min', '25%', '50%', '75%', 'max']

  constructor(private LineaesperaService: LineaesperaService) { }

  ngOnInit(): void {
    this.Form.addControl('lambda', this.lambdaC);
    this.Form.addControl('nu', this.nuC);
  }
  loading: boolean = false; // Flag variable

  onUpload() {
    this.datos = this.Form.value.lambda + "/" + this.Form.value.nu;
    this.loading = !this.loading;
    this.LineaesperaService
      .subirArchivo(this.datos)
      .subscribe((resp: any) => {
        console.log(resp);
        this.llegaronDatos = true;
        this.dataSource1 = resp.tabla;
        this.dataSource2 = resp.tablaDescribe;
        this.grafica = 'http://34.67.213.198:3000/images/' + resp.grafico;
      });
  }

}
