import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {ListService} from "../services/list.service";

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.scss']
})
export class ListFormComponent implements OnInit {

  listFormGroup;
  ownerOptions;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, public listService: ListService,
              private router: Router) { }

  ngOnInit() {

    const data = this.route.snapshot.data;
    this.ownerOptions = data.ownerOptions;

    this.listFormGroup = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      owner: [null],
      location: [''],
      list_type: [null, Validators.required],
    });

  }

  createList() {
    const list = this.listFormGroup.value;
    if (list.id) {
      this.http.put('/api/list/' + list.id + '/update', list)
        .subscribe(() => {
          this.router.navigate(['/home']);
        });
    } else {
      this.http.post('/api/list/create', list)
        .subscribe((response: any) => {
          this.router.navigate(['/home']);
        });
    }
  }

  backToListView()
  {
    this.router.navigate(['/home']);
  }

}
