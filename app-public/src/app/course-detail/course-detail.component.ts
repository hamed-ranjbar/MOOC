import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs';
import { MoocDataService } from '../_services/mooc-data.service';
import { Course } from '../interfaces/course';
import { Lecturer } from '../interfaces/lecturer';
import { Institution } from '../interfaces/institution';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {

  course = {} as Course;
  institutions: Institution[] = [];
  lecturers: Lecturer[] = [];

  studentIsEnrolled = false;
  enrolledStrudentsNumber = 0;

  skills = ['first one', 'second two', 'third three', 'forth four'];
  tableOfContent: any = {
    chapters: [
      { parts: [] }
    ]
  };

  constructor(
    private moocDataService: MoocDataService,
    private auth: AuthenticationService,
    private route: ActivatedRoute,
  ) { }

  private getCourse(courseId: string) {
    return this.moocDataService.getCourse(courseId)
      .then(async (newCourse) => {
        if (newCourse) {
          await newCourse.chapters.sort((a, b) => { return a.chapter_no - b.chapter_no; });
          this.course = newCourse;
        }
      });
  }
  private getChapters(courseId: string) {
    return this.moocDataService.getChapterList(courseId)
      .then((newChapterList) => {
        if (newChapterList)
          this.tableOfContent.chapters = newChapterList;
      });
  }
  private getChapterParts(chapter: any) {
    return this.moocDataService.getPartList(chapter.id)
      .then((newPartList) => {
        if (newPartList)
          chapter.parts = newPartList;
      });
  }
  private initiateInstitutionList() {
    let id: string;
    this.route.paramMap.pipe(
      switchMap((param: ParamMap) => {
        id = param.get('courseId')!.toString();
        return this.moocDataService.getCourseCreatedBy(id);
      })
    ).subscribe((newInstitutionList) => {
      if (newInstitutionList && newInstitutionList.length) {
        for (let inst of newInstitutionList)
          this.moocDataService.getInstitution(inst.institution_id).then((newInstitution) => {
            if (newInstitution) {
              this.institutions.push(newInstitution);
            }
          });
      }
    });
  }
  private initiateLecturerList() {
    let id: string;
    this.route.paramMap.pipe(
      switchMap((param: ParamMap) => {
        id = param.get('courseId')!.toString();
        return this.moocDataService.getOnCourse(id);
      })
    ).subscribe((newLecturerList) => {
      if (newLecturerList && newLecturerList.length) {
        for (let lect of newLecturerList)
          this.moocDataService.getLecturer(lect.lecturer_id).then((newLecturer) => {
            if (newLecturer) {
              this.lecturers.push(newLecturer);
            }
          });
      }
    });
  }
  private isEnrolled() {
    this.moocDataService.getEnrolledCourses(this.auth.getCurrentUser())
      .then(response => { this.studentIsEnrolled = true });
  }
  private getEnrolledStudentsNumber() {
    this.moocDataService.getEnrolledCourseCount(this.course)
      .then(response => {
        this.enrolledStrudentsNumber = response;
        console.log(response);
      });
  }
  async ngOnInit() {
    let courseId;
    this.route.paramMap.subscribe(ParameterMap => {
      courseId = ParameterMap.get('courseId');
    });
    if (courseId) {
      this.getCourse(courseId);
      await this.getChapters(courseId);
      for (let chapter of this.tableOfContent.chapters)
        this.getChapterParts(chapter);
    }
    await this.initiateInstitutionList();
    await this.initiateLecturerList();
    await this.getEnrolledStudentsNumber();
    await this.isEnrolled();
  }
  isLoggedIn() {
    return this.auth.isLoggedIn();
  }
  enrollCourse() {
    this.moocDataService.createEnrolledCourse(this.auth.getCurrentUser(), this.course);
  }
  continueToCourse() {
    console.log('oops')
  }

  scrolToElement(element: HTMLElement) {
    window.scrollTo({ top: element.offsetTop - 60 });
  }
}
