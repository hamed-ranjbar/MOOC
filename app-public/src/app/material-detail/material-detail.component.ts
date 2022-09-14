import { AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../interfaces/course';
import { Material } from '../interfaces/material';
import { MoocDataService } from '../_services/mooc-data.service';

@Component({
  selector: 'app-material-detail',
  templateUrl: './material-detail.component.html',
  styleUrls: ['./material-detail.component.scss']
})
export class MaterialDetailComponent implements OnInit, AfterViewInit {

  chapterIteratorNo = 0;
  partIteratorNo = 0;
  materialIteratorNo = 0;
  tableOfContent: any = { chapters: [{ parts: [{ materials: [{}] }] }] };
  course!: Course;
  material!: Material;

  constructor(
    private route: ActivatedRoute,
    private moocDataService: MoocDataService,
    private router: Router
  ) { }

  @ViewChild(MatSidenav) sideNav!: MatSidenav;
  @ViewChild(MatSidenavContent) sideNavContent!: MatSidenavContent;

  ngOnInit() {
    this.route.paramMap.subscribe(ParameterMap => {
      const courseId = ParameterMap.get('courseId');
      if (courseId)
        this.moocDataService.getCourse(courseId)
          .then(newCourse => {
            if (newCourse) {
              this.course = newCourse;
              this.tableOfContent = { chapters: this.course.chapters }
              this.materialChanged(0);
            }
          });
    });
  }

  ngAfterViewInit(): void {
    // if (window.innerWidth < 1000){
    //   this.sideNavContent.getElementRef().nativeElement.className = this.sideNavContent.getElementRef().nativeElement.className.replace('col-');
    // }
  }
  async nextMaterial() {
    this.tableOfContent.chapters[this.chapterIteratorNo].parts[this.partIteratorNo].active = true;
    let proceed = true;
    ++this.materialIteratorNo;
    while (this.materialIteratorNo >= this.tableOfContent.chapters[this.chapterIteratorNo].parts[this.partIteratorNo].materials.length) {
      this.tableOfContent.chapters[this.chapterIteratorNo].active = true;
      this.materialIteratorNo = 0;
      ++this.partIteratorNo;
      if (this.partIteratorNo == this.tableOfContent.chapters[this.chapterIteratorNo].parts.length) {
        this.partIteratorNo = 0;
        ++this.chapterIteratorNo;
        if (this.chapterIteratorNo >= this.tableOfContent.chapters.length) {
          this.router.navigate(['/certificate']);
          proceed = false;
        }
      }
    }

    if (proceed) {
      this.material = this.tableOfContent.chapters[this.chapterIteratorNo].parts[this.partIteratorNo].materials[this.materialIteratorNo];
      this.tableOfContent = { chapters: this.course.chapters }
    }
  };

  previousMaterial() {
    if (--this.materialIteratorNo <= 0) {
      this.materialIteratorNo = 0;
      if (--this.partIteratorNo <= 0) {
        this.partIteratorNo = 0;
        if (--this.chapterIteratorNo <= 0) {
          this.chapterIteratorNo = 0;
        }
      }
    }
    this.material = this.tableOfContent.chapters[this.chapterIteratorNo].parts[this.partIteratorNo].materials[this.materialIteratorNo];
  };

  materialChanged(score: number) {
    if (score)
      this.nextMaterial();
    else
      this.previousMaterial();
  };

}
