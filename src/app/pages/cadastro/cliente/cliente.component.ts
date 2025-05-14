import {
  Component,
  Inject,
  Optional,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import {
  MatTableDataSource,
  MatTable, 
} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatDialog, 
} from '@angular/material/dialog';
import { CommonModule, DatePipe } from '@angular/common';  
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { TablerIconsModule } from 'angular-tabler-icons'; 
import { MatNativeDateModule } from '@angular/material/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MaterialModule } from 'src/app/material.module';
import { ClienteService } from 'src/app/services/cadastro/cliente.service';  
import { ClienteFiltroDialogComponent } from './filtro/cliente-filtro-dialog.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cliente',
  imports: [
    MaterialModule,
    TablerIconsModule,
    MatNativeDateModule,
    NgScrollbarModule,
    RouterLink,
    MatFormFieldModule,
    CommonModule,
  ],
  providers: [DatePipe],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss'
})
export class ClienteComponent implements AfterViewInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  searchText: string = '';

  // Colunas melhoradas para exibir informações relevantes
  displayedColumns: string[] = [
    'clicdcli',      // Código
    'pesnomec',      // Nome/Razão Social
    'tpdtpdoc',      // Tipo Doc (CPF/CNPJ)
    'pesnudoc',      // Documento
    'pesemail',      // Email
    'pestel01',      // Telefone
    'endcidad',      // Cidade
    'endcdunf',      // UF
    'action',        // Ações
  ];

  dataSource = new MatTableDataSource<any>([]);

  constructor(
    public dialog: MatDialog, 
    public datePipe: DatePipe,
    public clienteService: ClienteService
    ) {}

  ngOnInit(): void {
    this.getClientes({}); 
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Exemplo de método para popular a grid com dados da API
  getClientes(data: any) {
    this.clienteService.getClientesAll(data).subscribe( 
      (response: any) => {
        this.dataSource.data = response.clientes;
      },
      (error: any) => {  
        this.dataSource.data = [];
      }
    );
  }

  openFilterDialog() {
    const dialogRef = this.dialog.open(ClienteFiltroDialogComponent, {
      width: '400px',
      data: {
        cdcli: 0,
        cdfil: 0,
        paisd: 0,
        idtpd: 2,
        nudoc: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getClientes(result);
      }
    });
  }

  onDelete(id : number) {
    // const dialogRef = this.dialog.open(ClienteDeleteDialogComponent, {
    //   width: '400px',
    //   data: { clicdcli: element.clicdcli }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.getClientes({}); // Atualiza a lista após a exclusão
    //   }
    // });
  }
}
