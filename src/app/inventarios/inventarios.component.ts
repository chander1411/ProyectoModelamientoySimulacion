import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { InventariosService } from './inventarios.service';

@Component({
  selector: 'app-inventarios',
  templateUrl: './inventarios.component.html',
  styleUrls: ['./inventarios.component.css'],
  providers: [InventariosService]
})
export class InventariosComponent implements OnInit {
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
  precioC: FormControl = new FormControl('');
  orderCostoC: FormControl = new FormControl('');
  inventarioInicialC: FormControl = new FormControl('');
  demandDistC: FormControl = new FormControl('');
  leadTimeDistC: FormControl = new FormControl('');
  periodosC: FormControl = new FormControl('');


  llegaronDatos: boolean = false;
  datosImg: string = '';
  graficaImg: string = '';
  dataSource: any = [{}];
  displayedColumns = ['INV_INICIAL',
    'INV_NETO_INICIAL',
    'DEMANDA',
    'INV_FINAL',
    'INV_FINAL_NETO',
    'VENTAS_PERDIDAS',
    'INV_PROMEDIO',
    'CANT_ORDENAR',
    'TIEMPO_LLEGADA'];

  distribuciones: any = [
    { value: 'Constant' },
    { value: 'Normal' },
    { value: 'Triangular' },
  ];

  constructor(private InventariosService: InventariosService) { }

  ngOnInit(): void {
    this.Form.addControl('precio', this.precioC);
    this.Form.addControl('orderCosto', this.orderCostoC);
    this.Form.addControl('inventarioInicial', this.inventarioInicialC);
    this.Form.addControl('demandDist', this.demandDistC);
    this.Form.addControl('leadTimeDist', this.leadTimeDistC);
    this.Form.addControl('periodos', this.periodosC);
  }
  loading: boolean = false; // Flag variable

  onUpload() {
    if (this.Form.value.demandDist == 'Constant') {
      this.data.demandP2 = "0.0";
      this.data.demandP3 = "0.0";
    }
    if (this.Form.value.demandDist == 'Normal') {
      this.data.demandP3 = "0.0";
    }
    if (this.Form.value.leadTimeDist == 'Constant') {
      this.data.leadTimeP2 = "0.0";
      this.data.leadTimeP3 = "0.0";
    }
    if (this.Form.value.leadTimeDist == 'Normal') {
      this.data.leadTimeP3 = "0.0";
    }

    this.datos = this.Form.value.precio + "/" + this.Form.value.orderCosto + "/" + this.Form.value.inventarioInicial + "/" + this.Form.value.demandDist + "/" + this.data.demandP1 + "/" + this.data.demandP2 + "/" + this.data.demandP3 + "/" + this.Form.value.leadTimeDist + "/" + this.data.leadTimeP1 + "/" + this.data.leadTimeP2 + "/" + this.data.leadTimeP3 + "/" + this.Form.value.periodos;
    this.loading = !this.loading;
    this.InventariosService
      .subirArchivo(this.datos)
      .subscribe((resp: any) => {
        console.log(resp);
        this.llegaronDatos = true;
        this.dataSource = resp.tabla;
      });
  }

}
