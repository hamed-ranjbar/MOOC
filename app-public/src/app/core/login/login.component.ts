import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginPage = true;
  formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required])
  });
  hide = true;
  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  getErrorMessage(validator: FormControl<string | null>) {
    if (validator.hasError('required'))
      return 'You must enter a value';
    else if (validator.hasError('minlength'))
      return 'Enter at least 6 characters';
    return validator.hasError('email') ? 'Not a valid email' : '';
  }

  tryLogin() {
    if (!this.formGroup.controls.email.invalid && !this.formGroup.controls.password.invalid) {
      this.authService.login({ email: this.formGroup.controls.email.value, password: this.formGroup.controls.password.value })
        .then(() => {
          this.dialogRef.close();
        }).catch(err => {
          this._snackBar.open('Incorrect credentials!', 'RETRY', { duration: 3000 });
        });
    } else
      this._snackBar.open('complete required inputs', 'OK', { duration: 3000 });
  }

  tryRegister() {
    if (!this.formGroup.controls.email.invalid && !this.formGroup.controls.password.invalid && !this.formGroup.controls.firstName.invalid && !this.formGroup.controls.lastName.invalid) {
      this.authService.register({ email: this.formGroup.controls.email.value, password: this.formGroup.controls.password.value, first_name: this.formGroup.controls.firstName.value, last_name: this.formGroup.controls.lastName.value })
        .then(() => { this.dialogRef.close(); })
        .catch(err => {
          this._snackBar.open('Incorrect credentials!', 'RETRY', { duration: 3000 });
        });;

    } else
      this._snackBar.open('complete required inputs', 'OK', { duration: 3000 });
  }
}
