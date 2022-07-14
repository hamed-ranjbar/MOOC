import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Material } from '../interfaces/material';
import { MoocDataService } from '../mooc-data.service';

@Component({
  selector: 'app-material-detail',
  templateUrl: './material-detail.component.html',
  styleUrls: ['./material-detail.component.scss']
})
export class MaterialDetailComponent implements OnInit {

  chapterIteratorNo = 0;
  partIteratorNo = 0;
  materialIteratorNo = 0;
  tableOfContent: any = { chapters: [{ parts: [{ materials: [{}] }] }] };

  material!: Material;

  constructor(private route: ActivatedRoute, private moocDataService: MoocDataService, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(ParameterMap => {
      const courseId = ParameterMap.get('courseId');
      if (courseId)
        this.moocDataService.getCourse(courseId)
          .then(newCourse => {
            this.tableOfContent = newCourse;
            this.materialChanged(0);
          });
    });
  }

  async nextMaterial() {
    let proceed = true;
    if (++this.materialIteratorNo >= this.tableOfContent.chapters[this.chapterIteratorNo].parts[this.partIteratorNo].materials.length) {
      this.materialIteratorNo = 0;
      if (++this.partIteratorNo >= this.tableOfContent.chapters[this.chapterIteratorNo].parts.length) {
        this.partIteratorNo = 0;
        if (++this.chapterIteratorNo >= this.tableOfContent.chapters.length) {
          this.router.navigate(['/certificate']);
          proceed = false;
        }
      }
    }
    if (proceed)
      this.material = this.tableOfContent.chapters[this.chapterIteratorNo].parts[this.partIteratorNo].materials[this.materialIteratorNo];
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
  }
}
