import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ← Necesario para *ngFor, *ngIf
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-admin-panel',
  standalone: true, // ← Asegúrate de que esto esté incluido
  imports: [CommonModule], // ← Agrega esta línea
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  users: any[] = [];
  posts: any[] = [];

  constructor(
    private userService: UserService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadPosts();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(data => this.users = data);
  }

  deleteUser(id: number) {
    if (confirm('¿Eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe(() => this.loadUsers());
    }
  }

  loadPosts() {
    this.postService.getPosts().subscribe(data => this.posts = data);
  }

  deletePost(id: number) {
    if (confirm('¿Eliminar esta publicación?')) {
      this.postService.deletePost(id).subscribe(() => this.loadPosts());
    }
  }
}
