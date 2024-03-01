import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatMenuModule} from "@angular/material/menu";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDrawerContainer, MatSidenavModule} from "@angular/material/sidenav";
import * as generatePassword from 'generate-password-ts';
import {ParentProductComponent} from "./parent-product/parent-product.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatMenuModule,
    MatIcon,
    MatIconButton,
    RouterLink,
    MatDrawerContainer,
    MatSidenavModule,
    MatButton,
    ParentProductComponent,
  ],
  templateUrl: 'app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isSmallScreen = false;
  reversedText = '';
  password = '';

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.XSmall])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
      });
  }

  onInputChange(event: any): void {
    this.reversedText = event.target.value.split('').reverse().join('');
  }

  generatePassword() {
    do {
      this.password = generatePassword.generate({
        length: 8,
        numbers: true,
        uppercase: true,
        lowercase: true,
        symbols: true,
      });
    } while (!this.hasRequiredCharacters(this.password));
  }

  hasRequiredCharacters(input: string): boolean {
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(input);
    const hasNumber = /\d/.test(input);
    const hasUpperCase = /[A-Z]/.test(input);
    const hasLowerCase = /[a-z]/.test(input);

    return hasSymbol && hasNumber && hasUpperCase && hasLowerCase;
  }
}
