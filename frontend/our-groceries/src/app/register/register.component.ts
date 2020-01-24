import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerFormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,
              private userService: UserService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    if (this.userService.isLoggedIn.getValue() === true) {
      this.router.navigate(['home']);
    }

    this.registerFormGroup = this.fb.group({
      username: ['', Validators.required],
      email: ['', [this.emailValidator(), Validators.required]],
      password: ['', Validators.required],
      password2: ['', [this.passwordValidator(), Validators.required]],
    });
  }

  register() {
    if (this.registerFormGroup.valid) {
      // Remove old access tokens if present
      localStorage.removeItem('access_token');

      this.http.post('/api/register/', this.registerFormGroup.value)
        .subscribe((res: any) => {
          this.snackBar.open('New user registered ', null, {
            duration: 2000,
          });
          location.reload();
        }, (error) => {
          let msg = 'Registration failed! ';

          if (error !== undefined && error.error !== undefined) {
            if (error.error.username !== undefined) {
              msg += '\n' + error.error.username;
            }
            if (error.error.email !== undefined) {
              msg += '\n' + error.error.email;
            }
            if (error.error.password !== undefined) {
              msg += '\n' + error.error.password;
            }
          } else {
            msg += 'Unknown Error!';
          }

          this.snackBar.open(msg, null, {
            duration: 2000,
          });
        });
    }
  }

  emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const validEmail = emailRegex.test(control.value) || /space/.test(control.value);
      return validEmail ? null : {'invalidEmail': {value: control.value}};
    };
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.registerFormGroup === undefined) return null;
      const pw1 = this.registerFormGroup.controls.password.value;
      const validPW = control.value === pw1;
      return validPW ? null : {'invalidPW': {value: control.value}};
    };
  }
}
