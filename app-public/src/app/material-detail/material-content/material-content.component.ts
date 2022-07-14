import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Material } from 'src/app/interfaces/material';
import { MaterialType } from 'src/app/interfaces/material-type';
import { MoocDataService } from 'src/app/mooc-data.service';

@Component({
  selector: 'app-material-content',
  templateUrl: './material-content.component.html',
  styleUrls: ['./material-content.component.scss']
})

export class MaterialContentComponent implements OnInit,OnChanges {

  private _material = new BehaviorSubject<Material>({
    id: '',
    material_type_id: '',
    material_no: 0,
    material_link: '',
    mandatory: true,
    part_id: '',
    max_point: 0,
  });
  materialType: MaterialType = { id: '', type_name: '' };
  @Input()
  set material(material: Material) {
    this._material.next(material);
  }
  get material() {
    return this._material.getValue();
  }
  @Output() passed = new EventEmitter<number>;
  score = 0;

  constructor(private moocDataService: MoocDataService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.moocDataService.getMaterialType(this.material.material_type_id)
    .then(response => {
      if (response)
        this.materialType = response;
    });
  }
  goNext() {
    this.score = this.material.max_point;
    this.passed.emit(this.score);
  }

  goPrevious() {
    this.score = 0;
    this.passed.emit(this.score);
  }
}
