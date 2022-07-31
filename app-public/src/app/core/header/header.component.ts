import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userLoggedIn;

  constructor(
    public dialog: MatDialog,
    private authService: AuthenticationService
  ) {
    this.userLoggedIn = authService.isLoggedIn()
  }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.userLoggedIn = this.authService.isLoggedIn();
    })
  }
  
  doLogout() {
    this.userLoggedIn = false;
    this.authService.logout();
  }

  getUserName() {
    return this.authService.getCurrentUser().first_name;
  }
}
