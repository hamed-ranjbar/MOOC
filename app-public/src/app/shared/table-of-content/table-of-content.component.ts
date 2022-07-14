import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-of-content',
  templateUrl: './table-of-content.component.html',
  styleUrls: ['./table-of-content.component.scss']
})
export class TableOfContentComponent implements OnInit {
  @Input() tableOfContent: any;

  constructor() { }

  ngOnInit(): void {
  }

}
