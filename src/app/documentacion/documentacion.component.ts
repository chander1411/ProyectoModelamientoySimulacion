import { Component} from '@angular/core';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-documentacion',
  templateUrl: './documentacion.component.html',
  styleUrls: ['./documentacion.component.css']
})
export class DocumentacionComponent {
  constructor(){ 
  }
  pdfSrc='https://raw.githubusercontent.com/chander1411/documentacionproyectosimulacion/main/DocumentacionProyecto.pdf';
  download() {
    const blob = this.pdfSrc;
    saveAs(blob, 'documentacion.pdf');
  }
}
