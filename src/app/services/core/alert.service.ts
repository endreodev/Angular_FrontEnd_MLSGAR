import { Injectable } from '@angular/core';
// Adicione a importação do SweetAlert2
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor() {}

  showSuccess(message: string) {
    // Use Swal diretamente
    Swal.fire({ title: 'Sucesso', text: message, icon: 'success', position: 'top-end', timer: 3500 , showConfirmButton: false });
  }

  showError(message: string) {
    Swal.fire({ title: 'Erro', text: message, icon: 'error', position: 'top-end', timer: 4000 , showConfirmButton: false  });
  }
}
