import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ListService} from "../services/list.service";
import {UserService} from "../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {RoleDialogComponent} from "../role-dialog/role-dialog.component";

export interface DialogData {
  role;
  userOptions;
}

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  role;
  userOptions;

  displayedColumns = ['user_name', 'role_type', 'id'];

  @Input() list_id;

  //@Input() listOptions;


  constructor(private http: HttpClient, private listService: ListService, public userService: UserService,
              public dialog: MatDialog, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.listService.getRole(this.list_id).subscribe(response => {
        this.role = response;
      }
    );

    this.userService.getUserOptions().subscribe(result => {
      this.userOptions = result;
    })
  }

  deleteRole(role) {
    this.listService.deleteRole(role)
      .subscribe(() => this.ngOnInit());
  }

  openRoleDialog(role) {
    const dialogRef = this.dialog.open(RoleDialogComponent, {
      width: '250px',
      data: {role: role, userOptions: this.userOptions}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  createRoleDialog() {
    // Opens a dialog to create a new role -> list_id is a constant
    const newRole = {
      list: this.list_id,
      role: undefined,
      role_type: undefined
    };
    this.openRoleDialog(newRole);
  }

}
