import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  user$: Observable<any>;  // Observable to track the user login state

  constructor(private router: Router, private authService: AuthService) {
    this.user$ = this.authService.user$; // Get the user state from AuthService
  }

  navigateToMaterials() {
    this.user$.subscribe(user => {
      if (user) {
        this.router.navigate(['/materials']);
      } else {
        alert('You need to log in to access Materials.');
      }
    });
  }

  navigateToPartManager() {
    this.user$.subscribe(user => {
      if (user) {
        this.router.navigate(['/part-manager']);
      } else {
        alert('You need to log in to access Part Manager.');
      }
    });
  }
}