import { Component, inject, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { OnesaitplatformservicesService } from '../onesaitplatformservices.service';
@Component({
  selector: 'app-formlist',
  standalone: true,
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './formlist.component.html',
  styleUrl: './formlist.component.css'
})
export class FormlistComponent {
  private onesaitplatformservicesService = inject(OnesaitplatformservicesService);
  error = '';
  @Input() reload = '';


  dataSource = [];
  displayedColumns: string[] = ['name', 'code', 'entity', 'description', 'options'];
  @Output() codeFormSelected = new EventEmitter<string>();

  public loadForms() {
    this.onesaitplatformservicesService.loadFormsList()?.subscribe({
      next: data => {
        this.dataSource = <any>data;
      }, // success path
      error: error => console.log(error), // error path
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.reload && this.reload.length > 0) {
      this.loadForms();
    }
  }

  loadForm(code: string) {
    this.codeFormSelected.emit(code);
  }

}
