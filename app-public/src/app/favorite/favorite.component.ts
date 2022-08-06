import { Component, OnInit } from '@angular/core';
import { MoocDataService } from '../mooc-data.service';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  constructor(
    private auth:AuthenticationService,
    private moocDataService:MoocDataService
  ) { }

  favoritePrograms: any;
  favoriteCourses: any;

  ngOnInit(): void {
    this.moocDataService.getFavoriteProgramList(this.auth.getCurrentUser().id)
    .then(programList => {
      this.favoritePrograms = programList;
    });
    this.moocDataService.getFavoriteCourseList(this.auth.getCurrentUser().id)
    .then(courseList => {
      this.favoriteCourses = courseList;
    });
  }

}
