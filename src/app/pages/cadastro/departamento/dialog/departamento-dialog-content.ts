import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { TablerIconsModule } from 'angular-tabler-icons'; 
import { MaterialModule } from 'src/app/material.module'; 

import Swal from 'sweetalert2';
import { DepartamentoService } from 'src/app/services/cadastro/departamento.service';

interface DialogData {
  action: string;
  departamento?: any;
}

@Component({
  selector: 'app-departamento-dialog-content',
  templateUrl: './departamento-dialog-content.html',
  styleUrls: ['./departamento-dialog-content.scss'],
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TablerIconsModule,
  ]
})

export class AppDepartamentoDialogContentComponent {
  action: string;
  local_data: any;
  isViewMode: boolean = false;
  
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AppDepartamentoDialogContentComponent>,
    private departamentoService: DepartamentoService,
    private snackBar: MatSnackBar,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.action = data.action;
    this.local_data = data.departamento ? { ...data.departamento } : {} as any;
    this.isViewMode = this.action === 'Visualizar';
  }

  doAction(): void {
    if (this.action === 'Adicionar') {
      
      const createRequest = {
        depcdemp: this.local_data.depcdemp,
        depcddep: this.local_data.depcddep,
        depdescr: this.local_data.depdescr
      };

      this.departamentoService.cadastrarDepartamento(createRequest).subscribe({
        next: (res) => {
          if (res) {
            Swal.fire({
              icon: 'success',
              title: 'Sucesso',
              text: 'Departamento cadastrado com sucesso!',
              confirmButtonText: 'OK',
              timer: 5000
            });
            this.dialogRef.close({ event: 'Refresh' });
          }
        },
        error: (error) => {
          this.snackBar.open('Erro ao cadastrar departamento: ' + (error?.message || ''), 'Fechar', {
            duration: 4000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      });

    } else if (this.action === 'Editar') {
      this.departamentoService.editarDepartamento(this.local_data).subscribe({
        next: (res) => {
          if (res) {
            Swal.fire({
              icon: 'success',
              title: 'Sucesso',
              text: 'Departamento editado com sucesso!',
              confirmButtonText: 'OK',
              timer: 5000
            });
            this.dialogRef.close({ event: 'Refresh' });
          }
        },
        error: (error) => {
          this.snackBar.open('Erro ao editar departamento: ' + (error?.message || ''), 'Fechar', {
            duration: 4000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      });

    } else if (this.action === 'Delete') {
      this.departamentoService.excluirDepartamento(this.local_data.depcddep).subscribe({
        next: () => {
          this.dialogRef.close({ event: 'Refresh' });
        },
        error: (error) => {
          this.snackBar.open('Erro ao excluir departamento: ' + (error?.message || ''), 'Fechar', {
            duration: 4000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
