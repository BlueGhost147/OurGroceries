import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DateComponent} from './date/date.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { ItemListComponent } from './item-list/item-list.component';
import { SingleItemComponent } from './single-item/single-item.component';
import { HomeOverviewComponent } from './home-overview/home-overview.component';
import { ListFormComponent } from './list-form/list-form.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {JwtModule} from '@auth0/angular-jwt';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { LockScreenComponent } from './lock-screen/lock-screen.component';
import {MatIconModule, MatTabsModule} from "@angular/material";
import {MatExpansionModule} from "@angular/material/expansion";

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    DateComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    ItemListComponent,
    SingleItemComponent,
    HomeOverviewComponent,
    ListFormComponent,
    LockScreenComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSelectModule,
    MatMenuModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatIconModule,
    JwtModule.forRoot(
      {
        config: {
          tokenGetter,
          whitelistedDomains: ['localhost:4200']
        }
      }
    ),
    MatSnackBarModule,
    MatDialogModule,
    FormsModule,
    MatExpansionModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
