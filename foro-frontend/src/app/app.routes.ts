import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'profile', loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent) },
  { path: 'recover-password', loadComponent: () => import('./pages/recover-password/recover-password.component').then(m => m.RecoverPasswordComponent) },
  { path: 'posts', loadComponent: () => import('./pages/posts/posts.component').then(m => m.PostsComponent) },
  { path: 'posts/:id', loadComponent: () => import('./pages/post-detail/post-detail.component').then(m => m.PostDetailComponent) },
  { path: 'admin', loadComponent: () => import('./pages/admin-panel/admin-panel.component').then(m => m.AdminPanelComponent) }
];
