import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/interfaces/course';
import { MoocDataService } from 'src/app/_services/mooc-data.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Institution } from 'src/app/interfaces/institution';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {
  private _progressValue = 0;
  institutions = {} as Institution;

  @Input() course!: Course;
  @Input()
  get progressValue() {
    return this._progressValue;
  }
  set progressValue(value) {
    this._progressValue = value % 100;
  }
  isFavorite: boolean = false;

  constructor(
    private moocDataService: MoocDataService,
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.isFavoriteCourse();
  }

  toggleFavorite() {
    console.log()
    if (this.isFavorite) {
      this.moocDataService.removeFavoriteCourse(this.auth.getCurrentUser().id, this.course.id)
        .finally(() => {
          this.isFavoriteCourse();
        });
    } else {
      this.moocDataService.addFavoriteCourse(this.auth.getCurrentUser().id, this.course.id)
        .finally(() => {
          this.isFavoriteCourse();
        });
    }
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  isFavoriteCourse() {
    console.log()
    this.isFavorite = false;
    this.moocDataService.getFavoriteCourse(this.auth.getCurrentUser().id, this.course.id)
      .then(favorite => {
        if (favorite)
          this.isFavorite = true
      });
  }
}

