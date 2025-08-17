import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAdminService } from '../../../services/user-admin';
import type { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-management.html',
  styleUrls: ['./user-management.scss']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  errorMessage = '';
  successMessage = '';
  loading = false;

  constructor(private userService: UserAdminService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.userService.getAllUsers().subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.users = data;
        } else {
          this.users = [];
          this.errorMessage = '❌ Unexpected response format from server.';
        }
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = '❌ Failed to load users. Please check server logs.';
        this.users = [];
        this.loading = false;
      }
    });
  }

  deleteUser(id: number): void {
    if (!id) {
      this.errorMessage = '❌ Invalid user ID.';
      return;
    }

    const confirmDelete = confirm('Are you sure you want to delete this user?');

    if (confirmDelete) {
      this.errorMessage = '';
      this.successMessage = '';

      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.successMessage = '✅ User deleted successfully.';
          this.loadUsers();
        },
        error: () => {
          this.errorMessage = '❌ Failed to delete user.';
        }
      });
    }
  }
}
