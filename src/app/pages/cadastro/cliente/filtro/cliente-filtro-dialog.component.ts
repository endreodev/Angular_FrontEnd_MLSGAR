import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cliente-filtro-dialog',
  templateUrl: './cliente-filtro-dialog.component.html',
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ClienteFiltroDialogComponent implements OnInit {
  filtroForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ClienteFiltroDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.filtroForm = this.fb.group({
      cdcli: [0],   // Código Cliente
      cdfil: [0],   // Código Filial
      paisd: [0],   // País
      idtpd: [0],   // Tipo Doc
      nudoc: [''],     // Número Documento
      nome: [this.data?.nome || ''],
      email: [this.data?.email || ''],
      status: [this.data?.status || ''],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onApply(): void {
    if (this.filtroForm.valid) {
      this.dialogRef.close(this.filtroForm.value);
    }
  }
}
