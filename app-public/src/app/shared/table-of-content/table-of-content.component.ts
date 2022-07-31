import { Component, Input, OnChanges, OnInit, SimpleChanges, } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-table-of-content',
  templateUrl: './table-of-content.component.html',
  styleUrls: ['./table-of-content.component.scss']
})
export class TableOfContentComponent implements OnInit, OnChanges {

  private _tableOfContent = new BehaviorSubject<Object>({ chapters: [{ parts: [{ materials: [{}] }] }] });

  @Input()
  set tableOfContent(newTableOfContent: any) {
    this._tableOfContent.next(newTableOfContent);
  }
  get tableOfContent() {
    return this._tableOfContent.getValue()
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['tableOfContent'].currentValue);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
