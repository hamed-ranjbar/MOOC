import { Component, OnInit } from '@angular/core';
import { MoocDataService } from '../mooc-data.service';
import { Program } from '../program';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {

  constructor(private moocDataService: MoocDataService) { }

  public programs: Program[] = [];

  getProgramsList() {
    this.moocDataService.getProgramList().then(programsList => this.programs = programsList);
  }

  async ngOnInit(): Promise<void> {
    this.getProgramsList();
  }

}
