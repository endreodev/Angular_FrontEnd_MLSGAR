import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-cliente-editar',
  imports: [    
    MaterialModule,
    TablerIconsModule,
    MatNativeDateModule,
    NgScrollbarModule,
    MatFormFieldModule 
  ],
  templateUrl: './cliente-editar.component.html',
  styleUrl: './cliente-editar.component.scss'
})
export class ClienteEditarComponent {
  id: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      // Aqui você pode usar o ID para carregar os dados do cliente
      console.log('ID do cliente:', this.id);
    });
  }

  ngAfterViewInit(): void {
    // Lógica após a visualização do componente
  }
}
