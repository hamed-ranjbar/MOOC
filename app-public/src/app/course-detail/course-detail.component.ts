import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs';
import { MoocDataService } from '../mooc-data.service';
import { Course } from '../interfaces/course';
import { Chapter } from '../interfaces/chapter';
import { Lecturer } from '../interfaces/lecturer';
import { Program } from '../interfaces/program';
import { Institution } from '../interfaces/institution';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {

  course: Course = {name:'',id:'',description:'',commitment:'',course_price:0,program_id:'',min_grade:0,active:false,chapters:[]};
  institutions: Institution[] = [];
  lecturers: Lecturer[] = [];

  pageContent = {
    header: {
      title: '',
      strapLine: ''
    },
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\n Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\n Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  };

  tableOfContent: any = {
    chapters: [
      { parts: [] }
    ]
  };

  constructor(private moocDataService: MoocDataService, private route: ActivatedRoute) { }

  private getCourse(courseId: string) {
    return this.moocDataService.getCourse(courseId)
      .then((newCourse) => {
        if (newCourse) {
          this.course = newCourse;
          this.pageContent.header.title = this.course.name;
          this.pageContent.header.strapLine = this.course.description;
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
  async ngOnInit(): Promise<void> {
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
  }

}
