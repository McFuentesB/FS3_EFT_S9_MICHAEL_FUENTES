import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authSpy: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    authSpy = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent, // standalone
        FormsModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: AuthService, useValue: authSpy }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('crea el componente', () => {
    expect(component).toBeTruthy();
  });

  it('inicia sesión y redirige al dashboard', () => {
    const fakeUser = { username: 'u', role: 'USER' };
    authSpy.login.and.returnValue(of(fakeUser));
    const routerSpy = spyOn(router, 'navigate');

    component.username = 'u';
    component.password = 'p';
    component.onLogin();

    expect(localStorage.getItem('user')).toEqual(JSON.stringify(fakeUser));
    expect(routerSpy).toHaveBeenCalledWith(['/dashboard']);
  });

  it('muestra alerta si login falla', () => {
    authSpy.login.and.returnValue(of(null));
    spyOn(window, 'alert');

    component.username = 'bad';
    component.password = 'wrong';
    component.onLogin();

    expect(window.alert).toHaveBeenCalledWith('Usuario o contraseña incorrectos');
  });

  it('goTo navega correctamente', () => {
    const spy = spyOn(router, 'navigate');
    component.goTo('register');
    expect(spy).toHaveBeenCalledWith(['/register']);
  });
});
