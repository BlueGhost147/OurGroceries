import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  getListById(id)
  {
    return this.http.get('/api/list/' + id + '/get');
  }

  getListsByUserId(id)
  {
    return this.http.get('/api/list/list');
  }
}
