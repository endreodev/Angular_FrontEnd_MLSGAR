import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { TablerIconsModule } from 'angular-tabler-icons'; 
import { MaterialModule } from 'src/app/material.module';
import Swal from 'sweetalert2';
import { CadastroBasicoService } from 'src/app/services/cadastro/basico/cadastro-basico.service';
import { FilialService } from 'src/app/services/cadastro/basico/filial-service';
import { UsuarioService, IUsuarioRequest } from 'src/app/services/cadastro/usuario.service';

interface Usuario {
  id?: number;
  usucdemp: string;
  usucduop: string;
  usucduop_orig?: string;
  usucdfil: string;
  usucddep: string;
  usucdtpv: string;
  usunores: string;
  usutpdoc: string;
  usutpdoc_orig?: string;
  usunudoc: string;
  usunudoc_orig?: string;
  usuemail: string;
  usucdusu: string;
  usuuscad?: string;
}

interface DialogData {
  action: string;
  usuario: Usuario;
}

@Component({
  selector: 'app-usuario-dialog-content',
  templateUrl: './usuario-dialog-content.html',
  standalone: true,
  imports: [ MaterialModule,FormsModule, ReactiveFormsModule, CommonModule, TablerIconsModule ]
})

export class AppUsuarioDialogContentComponent {
  action: string;
  local_data: Usuario;
  isViewMode: boolean = false;
  filiais: any[] = [];  
  tiposDocumento: any[] = [];
  departamentos: any[] = [];
  
  
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AppUsuarioDialogContentComponent>,
    private usuarioService: UsuarioService, 
    private filialService: FilialService,
    private cadatrosBasicos : CadastroBasicoService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.action = data ? data.action : 'Adicionar';
    this.local_data = data ? { ...data.usuario } : {} as Usuario;
    this.isViewMode = this.action === 'Visualizar';
  }

  doAction(): void {

    const usuarioRequest: IUsuarioRequest = {
      ...this.local_data,
      usuuscad: localStorage.getItem('usuarioauth') || ''
    };

    if (this.action === 'Adicionar') {
      
      this.usuarioService.cadastrarUsuario(usuarioRequest).subscribe({
        next: () => {
          this.dialogRef.close({ event: 'Adicionar' });
        }
      });

    } else if (this.action === 'Editar') {
      
      this.filialService.getFiliaisSimplesLista(null).subscribe((filiais: any[]) => {
        this.filiais = filiais;   
      });

      // this.cadatrosBasicos.getTipoDocumentoLista().subscribe((tiposDocumento: any[]) => {
      //   this.tiposDocumento = tiposDocumento;   
      // });
    
      
      const usuarioEdit: any = {
        ...usuarioRequest,
        usucduop_orig: this.local_data.usucduop,
        usutpdoc_orig: this.local_data.usutpdoc,
        usunudoc_orig: this.local_data.usunudoc
      };

      this.usuarioService.editarUsuario(usuarioEdit).subscribe({
        next: () => {
          this.dialogRef.close({ event: 'Editar' });
        }});

    } else if (this.action === 'Delete') {

      this.usuarioService.excluirUsuario(this.local_data.usucdusu).subscribe({
        next: () => { this.dialogRef.close({ event: 'Delete' }) }
      });
    
    }
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
