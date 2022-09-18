import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { last, lastValueFrom } from 'rxjs';

import { Program } from '../interfaces/program';
import { Course } from '../interfaces/course';
import { Chapter } from '../interfaces/chapter';
import { Part } from '../interfaces/part';
import { Lecturer } from '../interfaces/lecturer';
import { Institution } from '../interfaces/institution';
import { OnCourse } from '../interfaces/on-course';
import { OnProgram } from '../interfaces/on-program';
import { ProgramCreatedBy } from '../interfaces/program-created-by';
import { CourseCreatedBy } from '../interfaces/course-created-by';
import { Material } from '../interfaces/material';
import { MaterialType } from '../interfaces/material-type';
import { Student } from '../interfaces/student';
import { Authresponse } from '../interfaces/authresponse';
import { EnrolledCourse } from '../interfaces/enrolled-course';
import { Comment } from '../interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class MoocDataService {

  apiBaseURL = (environment.production) ? 'http://94.101.184.236:3000/api' : 'http://localhost:3000/api';

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
    const url = `${this.apiBaseURL}/oncourse/course/${courseId}`;
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

  public addFavoriteProgram(userId: string, programId: string) {
    const url = `${this.apiBaseURL}/favoriteprogram`;
    return lastValueFrom(this.httpClient.post(url, { program_id: programId, student_id: userId }))
      .then(newFavorite => newFavorite)
      .catch(this.handleError);
  }
  public removeFavoriteProgram(userId: string, programId: string) {
    const url = `${this.apiBaseURL}/favoriteprogram/student/${userId}/program/${programId}`;
    return lastValueFrom(this.httpClient.delete(url))
      .catch(this.handleError);
  }

  public addFavoriteCourse(userId: string, courseId: string) {
    const url = `${this.apiBaseURL}/favoritecourse`;
    return lastValueFrom(this.httpClient.post(url, { course_id: courseId, student_id: userId }))
      .then(newFavorite => newFavorite)
      .catch(this.handleError);
  }
  public removeFavoriteCourse(userId: string, courseId: string) {
    const url = `${this.apiBaseURL}/favoritecourse/student/${userId}/course/${courseId}`;
    return lastValueFrom(this.httpClient.delete(url))
      .catch(this.handleError);
  }

  public getFavoriteProgramList(userId: string) {
    const url = `${this.apiBaseURL}/favoriteprograms/student/${userId}`;
    return lastValueFrom(this.httpClient.get(url))
      .then(favorite => favorite as any[])
      .catch(this.handleError);
  }
  public getFavoriteProgram(userId: string, programId: string) {
    const url = `${this.apiBaseURL}/favoriteprogram/student/${userId}/program/${programId}`;
    return lastValueFrom(this.httpClient.get(url))
      .then(favorite => favorite as any)
      .catch(this.handleError);
  }

  public getFavoriteCourseList(userId: string) {
    const url = `${this.apiBaseURL}/favoritecourses/student/${userId}`;
    return lastValueFrom(this.httpClient.get(url))
      .then(favorite => favorite as any[])
      .catch(this.handleError);
  }
  public getFavoriteCourse(userId: string, courseId: string) {
    const url = `${this.apiBaseURL}/favoritecourse/student/${userId}/course/${courseId}`;
    return lastValueFrom(this.httpClient.get(url))
      .then(favorite => favorite as any)
      .catch(this.handleError);
  }

  public login(user: any) {
    return this.makeAuthApiCall('login', user);
  }
  public register(user: Student) {
    return this.makeAuthApiCall('student', user);
  }

  private makeAuthApiCall(urlPath: string, user: Student) {
    const url = `${this.apiBaseURL}/${urlPath}`;
    return lastValueFrom(this.httpClient.post(url, user))
      .then(response => response as Authresponse)
      .catch(this.handleError);
  }

  public createCourseSession(course: Course, duration: number) {
    const url = `${this.apiBaseURL}/coursesession`;
    return lastValueFrom(this.httpClient.post(url, {
      course_id: course.id,
      start_date: Date.now(),
      end_date: new Date().setDate(new Date().getDate() + duration)
    })).then(response => response as any)
      .catch(this.handleError);
  }

  public async createEnrolledCourse(user: Student, course: Course) {
    let url = `${this.apiBaseURL}/enrolledcourse`;
    let courseEnrollementInstance = {
      enrollement_date: Date.now(),
      status_date: Date.now(),
      final_grade: 0,
      student_id: user.id,
      course_session_id: null,
      course_id: course.id
    };
    await this.createCourseSession(course, 7).then((newCourseSession) => {
      courseEnrollementInstance.course_session_id = newCourseSession.id
    });
    return lastValueFrom(this.httpClient.post(url, courseEnrollementInstance))
      .then(response => response as EnrolledCourse)
      .catch(this.handleError);
  }

  public getEnrolledCourses(user: Student) {
    const url = `${this.apiBaseURL}/enrolledcourses/student/${user.id}`;
    return lastValueFrom(this.httpClient.get(url))
      .then(response => response as EnrolledCourse[])
      .catch(this.handleError);
  }

  public getEnrolledCourseCount(course: Course) {
    const url = `${this.apiBaseURL}/enrolledcourse/course/${course.id}/count`;
    return lastValueFrom(this.httpClient.get(url))
      .then((response: any) => response.count as number)
      .catch(this.handleError);
  }

  public getCommentsList(comment_on: string) {
    const url = `${this.apiBaseURL}/comments/${comment_on}`;
    return lastValueFrom(this.httpClient.get(url))
      .then(result => result as Comment[])
      .catch(this.handleError);
  }
  public getCommentsReply(reply_to: string) {
    const url = `${this.apiBaseURL}/comments/reply/${reply_to}`;
    return lastValueFrom(this.httpClient.get(url))
      .then(result => result as Comment[])
      .catch(this.handleError);
  }
  public createComment(comment: Comment) {
    const url = `${this.apiBaseURL}/comment`;
    return lastValueFrom(this.httpClient.post(url, comment))
      .then(result => result as Comment)
      .catch(this.handleError);
  }
}
