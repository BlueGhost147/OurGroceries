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

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, public listService: ListService,
              private router: Router) { }

  ngOnInit() {

    this.listFormGroup = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      owner_name: [null],
      location: [''],
      list_type: [null, Validators.required],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get('/api/list/' + id + '/get')
        .subscribe((response) => {
          this.listFormGroup.patchValue(response);
        });
    }

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

  backToListView() {
    this.router.navigate(['/home']);
  }

  toInt(key: string) {
    return parseInt(key, 10);
  }
}
