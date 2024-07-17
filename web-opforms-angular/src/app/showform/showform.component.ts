import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { OnesaitplatformservicesService } from '../onesaitplatformservices.service';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-showform',
  standalone: true,
  imports: [FormsModule,MatInputModule,MatDividerModule,MatButtonModule,MatFormFieldModule],
  templateUrl: './showform.component.html',
  styleUrl: './showform.component.css'
})
export class ShowformComponent {
  private onesaitplatformservicesService = inject(OnesaitplatformservicesService);
  oid='';
  private build: any;
  @Input() fcode ='';


  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    if(this.fcode && this.fcode.length>0){
      this.redirectTo({formcode:this.fcode,dataoid:null});
    }
  }

  redirectTo(data:any){
    if((<any>document.getElementById('formdiv')))
      { 
        (<any>document.getElementById('formdiv')).innerHTML = "";
      }
    this.showForm(data.formcode,data.dataoid);
  }

  showForm(formcode: string, formId: string) {
    var that = this;
    if (formcode && formcode.length > 0) {
      (<any>global).formId = formcode;
      //show existing form with data
      if (formId && formId.length > 0) {
        this.onesaitplatformservicesService.getData(formcode, formId)?.subscribe({
          next: resp => {
            if (!(<any>resp).i18nJson) {
              (<any>resp).i18nJson = null
            }
            if ((<any>resp)?.datasources) {
              (<any>global).ds = (<any>resp).datasources;
            }
            (<any>global).Formio.createForm(
              document.getElementById('formdiv'),
              (<any>resp).schema, (<any>resp).i18nJson
            ).then(function (build: any) {
              that.build = build;
              that.build.submission = {
                data: (<any>resp).data[0],
              };

              that.build.on('redirect', function (redirecto: any) {
                that.redirectTo(redirecto)
              })

              that.build.on("submit", function (submission: any) {
                that.onesaitplatformservicesService.updateData(formcode, formId, submission)?.subscribe({
                  next: response => {
                    that.build.emit("submitDone", submission);
                  }, // success path
                  error: error => {
                    console.log(error);
                    that.build.emit('submitError', error);
                  }

                });

              });
            });

          }, // success path
          error: error => console.log(error), // error path
        });

      }
      else {
        this.onesaitplatformservicesService.getForm(formcode)?.subscribe({
          next: resp => {
            if (!(<any>resp).i18nJson) {
              (<any>resp).i18nJson = null
            }
            if ((<any>resp)?.datasources) {
              (<any>global).ds = (<any>resp).datasources;
            }
            (<any>global).Formio.createForm(
              document.getElementById('formdiv'),
              JSON.parse( (<any>resp).jsonSchema), JSON.parse((<any>resp).i18nJson)
            ).then(function (build: any) {
              that.build = build;
             

              that.build.on('redirect', function (redirecto: any) {
                that.redirectTo(redirecto)
              })

              that.build.on("submit", function (submission: any) {
                that.onesaitplatformservicesService.createData(formcode, submission)?.subscribe({
                  next: response => {
                    if ((<any>response).ids && (<any>response).ids.length > 0) {
                      (<any>global).resultId = (<any>response).ids[0]
                    }
                    that.build.emit("submitDone", submission);
                  }, // success path
                  error: error => {
                    console.log(error);
                    that.build.emit('submitError', error);
                  }

                });

              });
            });

          }, // success path
          error: error => console.log(error), // error path
        });
      }

    }
  }
}
