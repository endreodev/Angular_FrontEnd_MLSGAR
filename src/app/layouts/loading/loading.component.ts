import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { LoadingService } from 'src/app/services/core/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule], // Importa o CommonModule para usar *ngIf
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent {
  loading = this.loadingService.loading$;

  constructor(private loadingService: LoadingService) {}
}
