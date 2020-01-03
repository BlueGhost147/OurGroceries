import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private userService: UserService, private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    if(this.userService.isLoggedIn.getValue() === true)
      this.router.navigate(['home']);

    this.loginFormGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.http.post('/api/api-token-auth/', this.loginFormGroup.value)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
        this.userService.isLoggedIn = new BehaviorSubject<boolean>(true);
        this.router.navigate(['home']).then(x => console.log(x));
      }, () => {
        this._snackBar.open('wrong username or password', null, {
          duration: 2000,
        });
      });
  }

}
