import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isSidebarOpen: boolean = false;

  constructor(private router:Router) {}

  isActive(url: string): boolean {
    return url === this.router.url;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen
  }
}
