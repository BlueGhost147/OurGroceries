import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ListService {

  listTypes = {
    1: 'Cooled',
    2: 'Shopping'
  };

  constructor(private http: HttpClient) {
  }

  getListById(id) {
    return this.http.get('/api/list/' + id + '/get');
  }

  getListsByUserId(id) {
  if(id !== undefined)
    return this.http.get('/api/list/list');
  }

  getCurrentLists(){
    return this.http.get('/api/user/getlists/');
  }

  setCurrentLists(listId, position){
    return this.http.get('/api/list/'+listId+'/set/'+position+'/');
  }
}
