import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingComponent } from './layouts/loading/loading.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, LoadingComponent],
    templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Flexy Angular Admin Template';
}
