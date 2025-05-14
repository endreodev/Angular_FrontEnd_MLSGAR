import { CommonModule } from '@angular/common';
import { Component } from '@angular/core'; 
import {  FormGroup,  FormControl,  Validators,  FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons'; 
import { MaterialModule } from 'src/app/material.module';  
import { AuthService } from 'src/app/services/core/auth.service';
import { CoreService } from 'src/app/services/core/core.service';

@Component({
  selector: 'app-side-login',
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule,
    CommonModule
  ],
  templateUrl: './side-login.component.html',
})

export class AppSideLoginComponent {
  options = this.settings.getOptions();
  isLoading = false;

  constructor(
      private settings: CoreService,
      private router: Router,
      private authService: AuthService) {}

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required]),
    remember: new FormControl(false)
  });

  get f() {
    return this.form.controls;
  }

  async submit() {
    if (this.form.invalid) return;

    this.isLoading = true;

    try {
      const body = {
        username: this.form.value.username,
        password: this.form.value.password
      };
      const success = await this.authService.login(body).toPromise();
      if (success) {
        this.router.navigate(['/dashboard']);
      }
    } finally {
      this.isLoading = false; 
    }
  }
}

