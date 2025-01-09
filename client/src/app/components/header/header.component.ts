import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HamburgerMenuComponent } from '../hamburger-menu/hamburger-menu.component';
import { IBurgerMenuOption } from '../../types/I-burgerMenu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HamburgerMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public menuOptions: IBurgerMenuOption[] = [
    { name: 'Immobilein', path: '/properties' },
    { name: 'Kontakte', path: '/contacts' },
    { name: 'Beziehungen', path: '/relations' },
  ];
}
