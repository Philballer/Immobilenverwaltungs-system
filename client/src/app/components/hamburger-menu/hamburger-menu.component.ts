import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IBurgerMenuOption } from '../../types/I-burgerMenu';

@Component({
  selector: 'app-hamburger-menu',
  standalone: true,
  imports: [CommonModule],
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
    console.log('burger was clicked');
    this.sideberVisible = !this.sideberVisible;
  }

  public closeSidebar(): void {
    console.log('sidebar was closed');
    this.sideberVisible = false;
  }
}
