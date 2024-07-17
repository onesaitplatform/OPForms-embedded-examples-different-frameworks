import { Component, Output, inject, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { OnesaitplatformservicesService } from '../onesaitplatformservices.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatCardModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: []
})
export class LoginComponent {
  hide = true;
  user = '';
  pass = '';
  @Output() logindone = new EventEmitter<string>();

  private onesaitplatformservicesService = inject(OnesaitplatformservicesService);

  constructor(private _snackBar: MatSnackBar) { }
  sendLogin() {
    this.onesaitplatformservicesService.login(this.user, this.pass).subscribe(
      {
        next: (v) => {
          this.logindone.emit('done');
          this._snackBar.open("Logged in", "OK", {
            duration: 3000
          })
        },
        error: (e) => this._snackBar.open("Error when logging in", "OK", {
          duration: 3000
        })
      })
  }
}
