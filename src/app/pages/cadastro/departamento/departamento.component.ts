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
import { AppDepartamentoDialogContentComponent } from './dialog/departamento-dialog-content';
import { DepartamentoService } from 'src/app/services/cadastro/departamento.service';

@Component({
    templateUrl: './departamento.component.html',
    imports: [
        MaterialModule,
        TablerIconsModule,
        MatNativeDateModule,
        NgScrollbarModule,
        CommonModule,
        FormsModule,
    ],
    providers: [DatePipe],
    standalone: true
})

export class DepartamentoComponent implements AfterViewInit {

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

  Departamentos: any[] = [];
  searchText: any;
  displayedColumns: string[] = [
    //"depcdemp",
    "depcddep",
    "depdescr",
    "depcddep_orig", 
    'action'
  ];

  dataSource = new MatTableDataSource(this.Departamentos);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =Object.create(null);

  constructor(
    public dialog: MatDialog,
    public datePipe: DatePipe,
    private route: ActivatedRoute,
    private departamentoService: DepartamentoService){}

  ngOnInit() {
    this.loadDepartamentos(); 
  }

  loadDepartamentos(filterParams?: any): void {
    this.departamentoService.getDepartamentos(filterParams).subscribe((Departamentos: any) => {
      this.Departamentos = Departamentos.departamentos|| []; // Ensure Departamentos is an array
      this.dataSource.data = this.Departamentos;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Method to open the filter modal
  openFilterModal(): void {
    this.dialog.open(this.filterModal, {
      width: '800px',
      disableClose: false
    });
  }

  // Method to apply the advanced filters
  applyFilters(): void {
    // Remove null or empty string values from filters
    const filterParams = Object.fromEntries(
      Object.entries(this.filters)
        .filter(([_, value]) => value !== null && value !== '')
    );
    
    // Load the data with the filters
    this.loadDepartamentos(filterParams);
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(AppDepartamentoDialogContentComponent, {
      width: '90vw',
      maxWidth: '1400px',
      data: {
        action: action,
        departamento: obj
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.event === 'Refresh') {
        this.loadDepartamentos();
      }
    });
  }

}
