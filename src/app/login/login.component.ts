import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  globalId: string = '';
  password: string = '';
  loading = false;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.loading = true;
    this.error = null;
    this.authService.login(this.globalId, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error = err.message;  // Izbacuje error message
        this.loading = false;
      }
    });
  }
}