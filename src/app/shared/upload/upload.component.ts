import { Component, OnInit, Input } from '@angular/core';
import { UploadsService } from './uploads.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  'providers': [UploadsService]
})
export class UploadComponent implements OnInit {
  @Input() public modelo : string;

  constructor(private UploadsService: UploadsService) { }

  ngOnInit(): void {
  }
  fileName = '';
  file: File | null = null; // Variable to store file
  loading: boolean = false; // Flag variable
  
  validar (files) {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    console.log(mimeType);
    if (mimeType.match(/application\/vnd.ms-excel/)== null && mimeType.match(/application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet/)==null) {
      Swal.fire({
        'title': 'Error de Archivo',
        'text': 'Debe escojer un archivo de tipo csv o xlsx!!',
        'icon': 'error'
      });
      return;
    }
    else{
      this.file=files[0];
    }

  }
  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.UploadsService
      .subirArchivo(this.file!, this.modelo)
      .subscribe((event: any) => {
        console.log(event);
      });
  }
}
