import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioChange } from '@angular/material/radio';
import { BehaviorSubject } from 'rxjs';
import { Material } from 'src/app/interfaces/material';
import { MaterialType } from 'src/app/interfaces/material-type';
import { MoocDataService } from 'src/app/mooc-data.service';

let compareJSON = (First: any, Second: any, options: any) => {
  for (let option of options) {
    if (First[option] != Second[option])
      return false;
  }
  return true;
}

@Component({
  selector: 'app-material-content',
  templateUrl: './material-content.component.html',
  styleUrls: ['./material-content.component.scss']
})

export class MaterialContentComponent implements OnInit, OnChanges {

  private _material = new BehaviorSubject<Material>({
    id: '',
    material_type_id: '',
    material_no: 0,
    material_content: '',
    mandatory: true,
    part_id: '',
    max_point: 0,
  });

  materialType: MaterialType = { id: '', type_name: '' };
  label: string = '';
  options: string[] = [];
  answer: any;
  chosenOptions: any = {};
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
  @HostListener('window:scroll', [])
  onScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight
      && this.materialType.type_name == 'text' || this.materialType.type_name == 'video') {
      this.score = this.material.max_point;
    }
  }
  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.moocDataService.getMaterialType(this.material.material_type_id)
      .then(response => {
        if (response) {
          this.score = 0;
          this.materialType = response;
          switch (this.materialType.type_name) {
            case 'quiz':
              this.label = this.material.material_content.split(':')[0];
              this.options = this.material.material_content.split(':')[1].split(',');
              this.answer = this.material.material_content.split(':')[2];
              break;
            case 'multi choice':
              this.label = this.material.material_content.split(':')[0];
              this.options = this.material.material_content.split(':')[1].split(',');
              this.answer = {};
              this.material.material_content.split(':')[1].split(',').forEach((value) => {
                this.answer[value] = false;
                this.chosenOptions[value] = false;
              });;
              this.material.material_content.split(':')[2].split(',').forEach((value) => {
                this.answer[value] = true
              });
              break;
            case 'text':
              break;
            case 'video':
              break;
            default:
              this.score = this.material.max_point;
          }
        }
      });
  }


  goNext() {
    this.score = this.material.max_point;
    this.passed.emit(this.score);
    this.score = 0;
  }

  goPrevious() {
    this.score = 0;
    this.passed.emit(this.score);
  }

  radioChanged(radioState: MatRadioChange) {
    this.score = (this.answer == radioState.value) ? this.material.max_point : 0;
  }

  checkBoxChanged(checkBoxState: MatCheckboxChange, option: string) {
    this.chosenOptions[option] = checkBoxState.checked;
    this.score = (compareJSON(this.answer, this.chosenOptions, this.options)) ? this.material.max_point : 0;
  }

  videoEnded() {
    this.score = this.material.max_point;
  }
}
