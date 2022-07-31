import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/interfaces/course';
import { MoocDataService } from 'src/app/mooc-data.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {

  @Input() course!: Course;
  isFavorite: boolean = false;

  constructor(
    private moocDataService: MoocDataService,
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  toggleFavorite() {
    console.log()
    if (this.isFavorite)
      this.moocDataService.removeFavoriteCourse(this.auth.getCurrentUser().id, this.course.id)
    else
      this.moocDataService.addFavoriteCourse(this.auth.getCurrentUser().id, this.course.id)
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  getFavorite() {
    this.isFavorite = false;
    this.moocDataService.getFavoriteCourse(this.auth.getCurrentUser().id, this.course.id).then(favorite => {
      if (favorite)
        this.isFavorite = true
    });
  }
}

