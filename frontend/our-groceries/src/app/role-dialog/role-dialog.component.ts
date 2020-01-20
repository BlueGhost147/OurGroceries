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

  roleOptions;

  constructor(public dialogRef: MatDialogRef<RoleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData, public listService: ListService, public userService: UserService) {
    this.roleOptions = data.roleOptions;
    alert(JSON.stringify(data));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveRole() {
    if (this.data.role.id === undefined) {
      this.listService.createRole(this.data.role).subscribe(() => console.log("Created role"));
    } else {
      this.listService.updateRole(this.data.role)
        .subscribe(() => console.log("Updated role"));
    }
  }

  ngOnInit(): void {
  }

}
