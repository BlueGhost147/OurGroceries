import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ListService} from "../services/list.service";
import {DialogData} from "../role-list/role-list.component";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.scss']
})
export class RoleDialogComponent implements OnInit {

  //roleOptions;
  allUsers;
  filteredUsers;

  constructor(public dialogRef: MatDialogRef<RoleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData, public listService: ListService, public userService: UserService) {
    //this.roleOptions = data.roleOptions;
    this.allUsers = data.userOptions;
    this.filteredUsers = this.allUsers;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveRole() {
    const newRole = {
      "list": this.data.role.list,
      "user":  this.data.role.user,
      "role_type": this.data.role.role_type.key,
      "id": this.data.role.id
    };
    if (this.data.role.id === undefined) {
      this.listService.createRole(newRole).subscribe(() => console.log("Created role"));
    } else {
      this.listService.updateRole(newRole)
        .subscribe(() => console.log("Updated role"));
    }
  }

  ngOnInit() {
  }


  filterUserList(val) {
    this.filteredUsers = this.allUsers.filter((user) => user.username.toLowerCase().indexOf(val.toLowerCase()) > -1);
  }

  onUserChange(source, value)
  {

  }

}
