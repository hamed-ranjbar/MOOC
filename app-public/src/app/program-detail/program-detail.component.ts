import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MoocDataService } from '../_services/mooc-data.service';
import { Program } from '../interfaces/program';
import { Course } from '../interfaces/course';
import { Institution } from '../interfaces/institution';
import { Lecturer } from '../interfaces/lecturer';
import { AuthenticationService } from '../_services/authentication.service';


@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.component.html',
  styleUrls: ['./program-detail.component.scss']
})
export class ProgramDetailComponent implements OnInit {

  program!: Program;
  institutions: Institution[] = [];
  lecturers: Lecturer[] = [];
  enrolled = Math.floor(Math.random() * 1000 + 1);
  skills: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private moocDataService: MoocDataService,
    private auth: AuthenticationService
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
      }
    });
  }
  // private initiateCourseList() {
  //   let id: string;
  //   this.route.paramMap.pipe(
  //     switchMap((param: ParamMap) => {
  //       id = param.get('programId')!.toString();
  //       return this.moocDataService.getCourseList(id);
  //     })
  //   ).subscribe((newCourseList) => {
  //     if (newCourseList)
  //       this.courses = newCourseList.filter(course => course.program_id == id);
  //   });
  // }
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
        for (let lect of newLecturerList)
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
    // this.initiateCourseList();
    this.initiateInstitutionList();
    this.initiateLecturerList();
  }
  isLoggedIn() {
    return this.auth.isLoggedIn();
  }
  isEnrolled() {
    return true;
  }
  enrollProgram() { }

  scrolToElement(element: HTMLElement) {
    window.scrollTo({ top: element.offsetTop - 60 });
  }
}
