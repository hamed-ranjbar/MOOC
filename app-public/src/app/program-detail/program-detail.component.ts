import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MoocDataService } from '../mooc-data.service';
import { Program } from '../interfaces/program';
import { Course } from '../interfaces/course';
import { Institution } from '../interfaces/institution';
import { Lecturer } from '../interfaces/lecturer';


@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.component.html',
  styleUrls: ['./program-detail.component.scss']
})
export class ProgramDetailComponent implements OnInit {

  program!: Program;
  institutions: Institution[] = [];
  lecturers: Lecturer[] = [];
  courses: Course[] = [];

  pageContent = {
    header: {
      title: '',
      strapLine: ''
    },
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\n Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\n Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  };

  constructor(
    private route: ActivatedRoute,
    private moocDataService: MoocDataService
  ) { }

  private initiateProgram() {
    let id: string;
    this.route.paramMap.pipe(
      switchMap((param: ParamMap) => {
        id = param.get('programId')!.toString();
        return this.moocDataService.getProgram(id);
      })
    ).subscribe((newProgram) => {
      if (newProgram) {
        this.program = newProgram;
        this.pageContent.header.title = this.program.name;
        this.pageContent.header.strapLine = this.program.description;
      }
    });
  }
  private initiateCourseList() {
    let id: string;
    this.route.paramMap.pipe(
      switchMap((param: ParamMap) => {
        id = param.get('programId')!.toString();
        return this.moocDataService.getCourseList(id);
      })
    ).subscribe((newCourseList) => {
      if (newCourseList)
        this.courses = newCourseList.filter(course => course.program_id == id);
    });
  }
  private initiateInstitutionList() {
    let id: string;
    this.route.paramMap.pipe(
      switchMap((param: ParamMap) => {
        id = param.get('programId')!.toString();
        return this.moocDataService.getProgramCreatedBy(id);
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
        id = param.get('programId')!.toString();
        return this.moocDataService.getOnProgram(id);
      })
    ).subscribe((newLecturerList) => {
      if (newLecturerList && newLecturerList.length) {
        for(let lect of newLecturerList)
        this.moocDataService.getLecturer(lect.lecturer_id).then((newLecturer) => {
          if (newLecturer) {
            this.lecturers.push(newLecturer);
          }
        });
      }
    });
  }
  ngOnInit(): void {
    this.initiateProgram();
    this.initiateCourseList();
    this.initiateInstitutionList();
    this.initiateLecturerList();
  }

}
