import {  Component,  Inject,  Optional,  ViewChild,  AfterViewInit, TemplateRef} from '@angular/core';
import {  MatTableDataSource,  MatTable,  MatTableModule} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {  MatDialog,  MatDialogRef,  MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { CommonModule, DatePipe } from '@angular/common';  
import { TablerIconsModule } from 'angular-tabler-icons'; 
import { MatNativeDateModule } from '@angular/material/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MaterialModule } from 'src/app/material.module';
import { ActivatedRoute } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { AppUsuarioDialogContentComponent } from './dialog/usuario-dialog-content'; 
import { UsuarioService } from 'src/app/services/cadastro/usuario.service';

@Component({
    templateUrl: './usuario.component.html',
    imports: [ MaterialModule, TablerIconsModule, MatNativeDateModule, NgScrollbarModule, CommonModule, FormsModule ],
    providers: [DatePipe],
    standalone: true
})

export class UsuarioComponent implements AfterViewInit {

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild('filterModal') filterModal!: TemplateRef<any>;

  action: string | any;

  
  
  // Define the filters object structure
  filters: {
    codigoUsuario: string;
    codigoFilial: number | null;
    tipoDocumento: string;
    numeroDocumento: string;
    codigoDepartamento: string;
    codigoTipoVinculo: number | null;
  } = {
    codigoUsuario: '',
    codigoFilial: null,
    tipoDocumento: '',
    numeroDocumento: '',
    codigoDepartamento: '',
    codigoTipoVinculo: null
  };

  usuarios: any[] = [];
  searchText: any;
  displayedColumns: string[] = [
    'usucdusu', 
    'usunores', 
    'usunudoc', 
    'filnores', 
    'depdescr', 
    'tpvdesre', 
    'action'
  ];

  dataSource = new MatTableDataSource(this.usuarios);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
    Object.create(null);

  constructor(
    public dialog: MatDialog,
    public datePipe: DatePipe,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService){}

  ngOnInit() {
    this.loadUsuarios(); 
  }

  loadUsuarios(filterParams?: any): void {
    this.usuarioService.getUsuarios(filterParams).subscribe((usuarios: any) => {
      this.usuarios = usuarios.usuarios || [];
      this.dataSource.data = this.usuarios;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openFilterModal(): void {
    this.dialog.open(this.filterModal, {
      width: '800px',
      disableClose: false
    });
  }

  applyFilters(): void {
    const filterParams = Object.fromEntries(
      Object.entries(this.filters)
        .filter(([_, value]) => value !== null && value !== '')
    );
    
    this.loadUsuarios(filterParams);
  }

  openDialog(action: string, data: any): void {
    const dialogConfig = {
      width: '90vw',
      maxWidth: '1400px',
      data: {
        action: action,
        usuario: data
      }
    };

    const dialogRef = this.dialog.open(AppUsuarioDialogContentComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.event !== 'Cancel') {
        this.loadUsuarios();
      }
    });
  }

}
