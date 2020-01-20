import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ListService} from "../services/list.service";
import {UserService} from "../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {RoleDialogComponent} from "../role-dialog/role-dialog.component";

export interface DialogData {
  roleOptions;
  role;
  user;
}

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  role: any[];
  roleOptions;

  displayedColumns = ['user_name', 'role_type', 'id'];

  @Input() role_id;
  @Input() list_id;
  @Input() listOptions;



  constructor(private http: HttpClient, private listService: ListService, public userService: UserService,
              public dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit() {

    /*const data = this.route.snapshot.data;
    this.roleOptions = data.roleOptions;

    this.listService.getRole(this.list_id)
      .subscribe((response: any[]) => {
        this.role = response;
      });*/

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get('/api/role/options/' + id)
        .subscribe((response) => {
          this.listService.getRole(response);
        });
    }

  }

  deleteRole(role) {
    this.listService.deleteRole(role)
      .subscribe(() => this.ngOnInit());
  }

  openRoleDialog(role) {
    const dialogRef = this.dialog.open(RoleDialogComponent, {
      width: '250px',
      data: {roleOptions: this.roleOptions, role}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  createRoleDialog() {
    const newRole = {product: this.role_id};
    this.openRoleDialog(newRole);
  }

}
