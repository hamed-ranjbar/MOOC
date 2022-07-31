import { Inject, Injectable } from '@angular/core';
import { Student } from '../interfaces/student';
import { MoocDataService } from '../mooc-data.service';
import { BROWSER_STORAGE } from '../storage';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private moocDataService: MoocDataService
  ) { }

  public login(student: any) {
    return this.moocDataService.login(student)
      .then((value => {
        this.saveToken(value.token);
        return true;
      })).catch(err => {
        console.log(err);
        return false;
      });
  }

  public register(student: any) {
    return this.moocDataService.register(student)
      .then((value => {
        this.saveToken(value.token);
        return true;
      })).catch(err => {
        return err;
      });
  }

  public getToken() {
    return this.storage.getItem('student-token');
  }

  public saveToken(token: string) {
    return this.storage.setItem('student-token', token);
  }

  public logout() {
    this.storage.removeItem('student-token');
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken() || '';
    if (token) {
      const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      return payload.exp > (Date.now() / 1000);
    } else { return false; }
  }

  public getCurrentUser() {
    if (this.isLoggedIn()) {
      const token: string = this.getToken() || '';
      const { id, email, first_name, last_name } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      return { id, email, first_name, last_name } as Student;
    }
    return { id: '', email: '', first_name: '', last_name: '' } as Student;
  }
}