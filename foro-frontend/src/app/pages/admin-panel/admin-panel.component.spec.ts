import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPanelComponent } from './admin-panel.component';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('AdminPanelComponent', () => {
  let comp: AdminPanelComponent;
  let fixture: ComponentFixture<AdminPanelComponent>;
  let userSpy = jasmine.createSpyObj('UserService', ['getUsers','deleteUser']);
  let postSpy = jasmine.createSpyObj('PostService', ['getPosts','deletePost']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AdminPanelComponent,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: UserService, useValue: userSpy },
        { provide: PostService, useValue: postSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPanelComponent);
    comp = fixture.componentInstance;
    userSpy.getUsers.and.returnValue(of([]));
    postSpy.getPosts.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('crea el componente', () => expect(comp).toBeTruthy());

  it('elimina usuario', () => {
    spyOn(window,'confirm').and.returnValue(true);
    userSpy.deleteUser.and.returnValue(of({}));
    comp.deleteUser(1);
    expect(userSpy.deleteUser).toHaveBeenCalledWith(1);
  });

  it('elimina publicación', () => {
    spyOn(window,'confirm').and.returnValue(true);
    postSpy.deletePost.and.returnValue(of({}));
    comp.deletePost(1);
    expect(postSpy.deletePost).toHaveBeenCalledWith(1);
  });
});
