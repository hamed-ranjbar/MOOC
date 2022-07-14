import { Component, Input, OnInit } from '@angular/core';
import { Lecturer } from 'src/app/interfaces/lecturer';

@Component({
  selector: 'app-lecturer-info',
  templateUrl: './lecturer-info.component.html',
  styleUrls: ['./lecturer-info.component.scss']
})
export class LecturerInfoComponent implements OnInit {
  @Input() Lecturer!: Lecturer;
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\n Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\n Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  constructor() { }

  ngOnInit(): void {
  }

}
