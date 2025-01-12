import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IBurgerMenuOption } from '../../types/I-burgerMenu';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hamburger-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hamburger-menu.component.html',
  styleUrl: './hamburger-menu.component.scss',
})
export class HamburgerMenuComponent {
  public sideberVisible: boolean = false;

  @Input()
  public menuOptions: IBurgerMenuOption[] = [
    { name: 'Option 1', path: '/' },
    { name: 'Option 2', path: '' },
    { name: 'Option 3', path: '' },
  ];

  public toggleSidebar(): void {
    this.sideberVisible = !this.sideberVisible;
  }

  public closeSidebar(): void {
    this.sideberVisible = false;
  }
}
