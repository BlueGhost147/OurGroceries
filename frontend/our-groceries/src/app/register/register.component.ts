import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../services/user.service";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerFormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private userService: UserService, private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    if (this.userService.isLoggedIn.getValue() === true)
      this.router.navigate(['home']);

    this.registerFormGroup = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  register() {
    this.http.post('/api/register/', this.registerFormGroup.value)
      .subscribe((res: any) => {
        this._snackBar.open('New user registered ', null, {
          duration: 2000,
        });
        this.ngOnInit();
      }, (error) => {
        let msg = 'Registration failed! ';

        if(error.error.username !== undefined) msg += '\n' + error.error.username;
        if(error.error.email !== undefined) msg += '\n' + error.error.email;
        if(error.error.password !== undefined) msg += '\n' + error.error.password;

        this._snackBar.open(msg, null, {
          duration: 2000,
        });
      });
  }

}
