import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';

import { ShowformComponent } from '../showform/showform.component';
import { MatCardModule } from '@angular/material/card';

import { MatButtonModule } from '@angular/material/button';

import { FormlistComponent } from '../formlist/formlist.component';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatTabsModule, MatDividerModule, ShowformComponent, LoginComponent, FormlistComponent, MatCardModule, MatButtonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  index = 0;
  formCode = '';
  reloadFormlist = '';

  formSelected(code: string) {
    this.index = 2
    this.formCode = code;
  }

  loginDone(event: string) {
    this.index = 1
    this.reloadFormlist = event + 1;
  }

}
