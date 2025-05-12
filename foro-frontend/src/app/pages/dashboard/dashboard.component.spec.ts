import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DashboardComponent,
        RouterTestingModule.withRoutes([])
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('debería crearse el componente con usuario', () => {
    localStorage.setItem('user', JSON.stringify({ username: 'x', role: 'user' }));
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.username).toBe('x');
    expect(component.role).toBe('USER'); // Se convierte a mayúsculas
  });

  it('debería redirigir a login si no hay usuario en localStorage', () => {
    const spy = spyOn(router, 'navigate');
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(['/login']);
  });

  it('debería llamar a router.navigate en goTo()', () => {
    const spy = spyOn(router, 'navigate');
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.goTo('posts');
    expect(spy).toHaveBeenCalledWith(['/posts']);
  });

  it('debería borrar localStorage y redirigir en logout()', () => {
    localStorage.setItem('user', JSON.stringify({ username: 'x', role: 'USER' }));
    const spy = spyOn(router, 'navigate');
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.logout();
    expect(localStorage.getItem('user')).toBeNull();
    expect(spy).toHaveBeenCalledWith(['/login']);
  });
});
