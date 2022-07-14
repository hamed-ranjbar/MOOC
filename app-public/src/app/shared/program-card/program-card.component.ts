import { Component, Input, OnInit } from '@angular/core';
import { Institution } from 'src/app/interfaces/institution';
import { MoocDataService } from 'src/app/mooc-data.service';
import { Program } from '../../interfaces/program';

@Component({
  selector: 'app-program-card',
  templateUrl: './program-card.component.html',
  styleUrls: ['./program-card.component.scss']
})
export class ProgramCardComponent implements OnInit {
  @Input() program!: Program;
  institute!: Institution;

  constructor(private moocDataService: MoocDataService) { }

  ngOnInit(): void {
    this.moocDataService.getProgramCreatedBy(this.program.id)
      .then(programCreatedBy => {
        if (programCreatedBy && programCreatedBy.length) {
          this.moocDataService.getInstitution(programCreatedBy[0].institution_id)
            .then(newInstitute => {
              if (newInstitute)
                this.institute = newInstitute;
            })
            .catch(err => { this.handleError });
        }
      })
      .catch(err => { this.handleError });
  }

  handleError(err: any) {
    console.log(err);
  }

}
