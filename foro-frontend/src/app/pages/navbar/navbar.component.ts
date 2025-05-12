import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public router: Router) {}

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  get role(): string {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u).role.toUpperCase() : '';
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
