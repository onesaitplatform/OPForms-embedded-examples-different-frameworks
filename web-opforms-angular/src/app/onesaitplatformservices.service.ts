import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


export interface Config {
  auth: string;
  platformbase: string;
  appbase:string;

}


@Injectable({
  providedIn: 'root'
})
export class OnesaitplatformservicesService {
  // config.json path
  configUrl = 'assets/config.json';
  config: Config | undefined;
  authorization: any;
  error: any;
  httpLoginOptions = {};
  httpHeaders = {};


  constructor(private http: HttpClient) {
    this.getConfig();
  }

  // function that reads the configuration file and creates the header for the login function
  getConfig() {
    return this.http.get<Config>(this.configUrl).subscribe({
      next: data => {
        this.config = { ...data };
        
        (<any>global).platformbase = data.platformbase;
        (<any>global).appbase = data.appbase;
        (<any>global).formsBaseURLCreate = `${data.platformbase}/controlpanel/api/forms`;
        (<any>global).redirectBy = 'events';
        this.httpLoginOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': data.auth
          })
        }
      }, // success path
      error: error =>console.log(error), // error path
    });

  }
  // function that performs the login on the platform
  login(user: string, pass: string) {
    let body = new URLSearchParams();
    body.set('username', user);
    body.set('grant_type', 'password');
    body.set('password', pass);
    var sub = this.http.post(this.config?.platformbase + "/auth/realms/onesaitplatform/protocol/openid-connect/token", body.toString(), this.httpLoginOptions);
    sub.subscribe({
      next: data => {
        this.authorization = data;
        //save authorization in global context
        (<any>global).authorization = { token_type: 'bearer', access_token: this.authorization.access_token }

        this.httpHeaders = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `${this.authorization.token_type} ${this.authorization.access_token}`
          })
        }        
      }, // success path
      error: error => {
        console.log(error);         
      }, // error path
    });
    return sub;
  }

  // function that obtains the list of forms from the logged in user
  loadFormsList() {
    if (!this.authorization) {
      return null;
    }
    return this.http.get(`${this.config?.platformbase}/controlpanel/api/forms/`, this.httpHeaders);
  }


  getData(formid:string, dataoid:string){
    if (!this.authorization) {
      return null;
    }
    return this.http.get(`${this.config?.platformbase}/controlpanel/api/forms/${formid}/data/${dataoid}`, this.httpHeaders);
  }

  getForm(formid:string){
    if (!this.authorization) {
      return null;
    }
    return this.http.get(`${this.config?.platformbase}/controlpanel/api/forms/${formid}`, this.httpHeaders);
  }

  createData(formid:string, submission:any){
    if (!this.authorization) {
      return null;
    }
    submission.metadata.formId = formid;
    delete submission.data.submit;
    return this.http.post(this.config?.platformbase + "/controlpanel/api/forms/submit",JSON.stringify(submission), this.httpHeaders);
  }
  updateData(formid:string, dataoid:string, submission:any){
    if (!this.authorization) {
      return null;
    }
    submission.metadata.formId = formid;
    submission.metadata.dataId = dataoid
    delete submission.data.submit;
    return this.http.post(this.config?.platformbase + "/controlpanel/api/forms/submit/update", JSON.stringify(submission), this.httpHeaders);
  }
}
