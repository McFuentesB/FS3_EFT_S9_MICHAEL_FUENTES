import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // ← IMPORTANTE

@Component({
  selector: 'app-dashboard',
  standalone: true, // ← Agrega esto si no lo tenías
  imports: [CommonModule], // ← Agrega CommonModule aquí
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username = '';
  role = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.username = user.username;
      this.role = (user.role || '').toUpperCase(); // ← Normaliza a mayúsculas por si acaso
    } else {
      this.router.navigate(['/login']);
    }
  }

  goTo(path: string) {
    this.router.navigate(['/' + path]);
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
