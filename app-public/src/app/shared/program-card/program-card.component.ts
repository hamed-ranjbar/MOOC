import { Component, Input, OnInit } from '@angular/core';
import { Institution } from 'src/app/interfaces/institution';
import { MoocDataService } from 'src/app/mooc-data.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Program } from '../../interfaces/program';

@Component({
  selector: 'app-program-card',
  templateUrl: './program-card.component.html',
  styleUrls: ['./program-card.component.scss']
})

export class ProgramCardComponent implements OnInit {
  @Input() program!: Program;
  institute!: Institution;
  isFavorite: boolean = false;

  constructor(
    private moocDataService: MoocDataService,
    private auth: AuthenticationService
  ) { }

  private getProgram() {
    this.moocDataService.getProgramCreatedBy(this.program.id)
      .then(programCreatedBy => {
        if (programCreatedBy && programCreatedBy.length) {
          this.moocDataService.getInstitution(programCreatedBy[0].institution_id)
            .then(newInstitute => {
              if (newInstitute)
                this.institute = newInstitute;
            })
            .catch(this.handleError);
        }
      })
      .catch(this.handleError);
  }

  ngOnInit(): void {
    this.getProgram();
    this.isFavoriteProgram();
  }

  handleError(err: any) {
    console.log(err);
  }

  toggleFavorite() {
    if (this.isFavorite) {
      this.moocDataService.removeFavoriteProgram(this.auth.getCurrentUser().id, this.program.id).then(() => {
        this.isFavoriteProgram();
      });
    } else {
      this.moocDataService.addFavoriteProgram(this.auth.getCurrentUser().id, this.program.id).finally(() => {
        this.isFavoriteProgram()
      });
    }
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  isFavoriteProgram(): any {
    this.isFavorite = false;
    this.moocDataService.getFavoriteProgram(this.auth.getCurrentUser().id, this.program.id)
      .then(favorite => {
        if (favorite)
          this.isFavorite = true
      });
  }
}
