import { Component, OnInit } from '@angular/core';
import { Course } from '../interfaces/course';
import { EnrolledCourse } from '../interfaces/enrolled-course';
import { AuthenticationService } from '../_services/authentication.service';
import { MoocDataService } from '../_services/mooc-data.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {

  _enrolledCourses: EnrolledCourse[] = [];
  get enrolledCourses() {
    return this._enrolledCourses;
  }
  set enrolledCourses(newCourses) {
    this._enrolledCourses = newCourses;
  }

  constructor(
    private moocDataService: MoocDataService,
    private auth: AuthenticationService
  ) { }

  async ngOnInit() {
    await this.getCourses();
  }

  private async getCourses() {
    await this.moocDataService.getEnrolledCourses(this.auth.getCurrentUser())
      .then((newCourses) => {
        console.log(newCourses);
        if (newCourses)
          this.enrolledCourses = newCourses;
      });
  }
}
