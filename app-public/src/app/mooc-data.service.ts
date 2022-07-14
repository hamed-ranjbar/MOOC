import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { last, lastValueFrom } from 'rxjs';

import { Program } from './interfaces/program';
import { Course } from './interfaces/course';
import { Chapter } from './interfaces/chapter';
import { Part } from './interfaces/part';
import { Lecturer } from './interfaces/lecturer';
import { Institution } from './interfaces/institution';
import { OnCourse } from './interfaces/on-course';
import { OnProgram } from './interfaces/on-program';
import { ProgramCardComponent } from './shared/program-card/program-card.component';
import { ProgramCreatedBy } from './interfaces/program-created-by';
import { CourseCreatedBy } from './interfaces/course-created-by';
import { response } from 'express';
import { Material } from './interfaces/material';
import { MaterialType } from './interfaces/material-type';

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

  public getProgram(id: string) {
    const url = `${this.apiBaseURL}/program/${id}`;
    return lastValueFrom(this.httpClient.get(url))
      .then(response => response as Program)
      .catch(error => { this.handleError });
  }

  public getCourseList(programId: string) {
    const url = `${this.apiBaseURL}/courses`;
    return lastValueFrom(this.httpClient.get(url))
      .then(response => response as Course[])
      .catch(error => { this.handleError });
  }

  public getCourse(courseId: string) {
    const url = `${this.apiBaseURL}/course/${courseId}`;
    return lastValueFrom(this.httpClient.get(url))
      .then(response => response as Course)
      .catch(error => { this.handleError });
  }

  public getChapterList(courseId: string) {
    const url = `${this.apiBaseURL}/chapters/course/${courseId}`;
    return lastValueFrom(this.httpClient.get(url))
      .then(response => response as Chapter[])
      .catch(error => { this.handleError })
  }

  public getPartList(chapterId: string) {
    const url = `${this.apiBaseURL}/parts/chapter/${chapterId}`;
    return lastValueFrom(this.httpClient.get(url))
      .then(response => response as Part)
      .catch(error => { this.handleError });
  }

  public getPart(partId: string) {
    const url = `${this.apiBaseURL}/part/${partId}`;
    return lastValueFrom(this.httpClient.get(url))
      .then(response => response as Part)
      .catch(error => { this.handleError });
  }

  public getMaterialList(partId: string) {
    const url = `${this.apiBaseURL}/materials/part/${partId}`;
    return lastValueFrom(this.httpClient.get(url))
      .then(response => response as Material[])
      .catch(error => { this.handleError });
  }

  public getLecturer(lecturerId: string) {
    const url = `${this.apiBaseURL}/lecturer/${lecturerId}`;
    return lastValueFrom(this.httpClient.get(url))
      .then(response => response as Lecturer)
      .catch(error => { this.handleError });
  }

  public getInstitution(institutionId: string) {
    const url = `${this.apiBaseURL}/institution/${institutionId}`;
    return lastValueFrom(this.httpClient.get(url))
      .then(response => response as Institution)
      .catch(error => { this.handleError });
  }

  public getOnProgram(programId: string) {
    const url = `${this.apiBaseURL}/onprogram/program/${programId}`;
    return lastValueFrom(this.httpClient.get(url))
      .then(response => response as OnProgram[])
      .catch(error => { this.handleError });
  }

  public getOnCourse(courseId: string) {
    const url = `${this.apiBaseURL}/oncouse/course/${courseId}`;
    return lastValueFrom(this.httpClient.get(url))
      .then(response => response as OnCourse[])
      .catch(error => { this.handleError });
  }

  public getProgramCreatedBy(programId: string) {
    const url = `${this.apiBaseURL}/programcreatedby/program/${programId}`;
    return lastValueFrom(this.httpClient.get(url))
      .then(response => response as ProgramCreatedBy[])
      .catch(error => { this.handleError });
  }

  public getCourseCreatedBy(courseId: string) {
    const url = `${this.apiBaseURL}/coursecreatedby/course/${courseId}`;
    return lastValueFrom(this.httpClient.get(url))
      .then(response => response as CourseCreatedBy[])
      .catch(error => { this.handleError });
  }

  public getMaterialType(id: string) {
    const url = `${this.apiBaseURL}/material_type/${id}`;
    return lastValueFrom(this.httpClient.get(url))
      .then(response => response as MaterialType)
      .catch(err => { this.handleError });
  }

}
