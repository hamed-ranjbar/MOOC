import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';

import { Program } from './program';

@Injectable({
  providedIn: 'root'
})
export class MoocDataService {

  apiBaseURL = (environment.production) ? 'http://localhost:3000/api' : 'http://localhost:3000/api';

  constructor(private httpClient: HttpClient) { }

  handleError(error: any) {
    console.error('STH WENT WRONG!', error);
    return Promise.reject(error.message || error);
  }

  public getProgramList() {
    const url = `${this.apiBaseURL}/programs`;
    return lastValueFrom(this.httpClient.get(url))
      .then(resposnse => resposnse as Program[])
      .catch(this.handleError);
  }

}
