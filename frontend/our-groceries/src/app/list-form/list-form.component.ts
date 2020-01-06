import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {ListService} from "../services/list.service";

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.scss']
})
export class ListFormComponent implements OnInit {

  listFormGroup;
  ownerOptions;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, public listService: ListService) { }

  ngOnInit() {

    const data = this.route.snapshot.data;
    this.ownerOptions = data.ownerOptions;

    this.listFormGroup = this.fb.group({
      id: [null],
      name: [''],
      owner: [null],
      location: [''],
      list_type: [null],
    });

  }

  createList() {
    const list = this.listFormGroup.value;
    if (list.id) {
      this.http.put('/api/list/' + list.id + '/update', list)
        .subscribe(() => {
          alert('updated successfully');
        });
    } else {
      this.http.post('/api/list/create', list)
        .subscribe((response: any) => {
          alert('created successfully');
        });
    }
  }

}
