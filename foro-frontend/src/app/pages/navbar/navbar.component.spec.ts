import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarComponent', () => {
  let comp: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, RouterTestingModule.withRoutes([])]
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(NavbarComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('debería crear el componente', () => {
    expect(comp).toBeTruthy();
  });

  it('isLoggedIn debe retornar true si hay usuario', () => {
    localStorage.setItem('user', JSON.stringify({ username: 'x' }));
    expect(comp.isLoggedIn).toBeTrue();
  });

  it('isLoggedIn debe retornar false si no hay usuario', () => {
    localStorage.removeItem('user');
    expect(comp.isLoggedIn).toBeFalse();
  });

  it('role debe retornar el rol en mayúsculas si hay usuario', () => {
    localStorage.setItem('user', JSON.stringify({ role: 'admin' }));
    expect(comp.role).toBe('ADMIN');
  });

  it('role debe retornar cadena vacía si no hay usuario', () => {
    localStorage.removeItem('user');
    expect(comp.role).toBe('');
  });

  it('logout debe borrar localStorage y redirigir a login', () => {
    const spy = spyOn(router, 'navigate');
    localStorage.setItem('user', JSON.stringify({ username: 'x' }));
    comp.logout();
    expect(localStorage.getItem('user')).toBeNull();
    expect(spy).toHaveBeenCalledWith(['/login']);
  });
});
