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

  role_types = {
    1: 'Read',
    2: 'Approval_req',
    3: 'Modify',
    4: 'Co-owner'
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

  //Maybe move this to another service
  getAllItems() {
    return this.http.get('/api/user/getAllItems/');
  }



  getRole(id) {
    return this.http.get('/api/role/options/' + id);
  }


  createRole(role) {
    return this.http.post('/api/role/create', role);
  }

  updateRole(role) {
    return this.http.put('/api/role/' + role.id + '/update', role);
  }

  deleteRole(role) {
    return this.http.delete('/api/role/' + role.id + '/delete');
  }

  getLiatPermissionLevel(listId)
  {
    return this.http.get('/api/list/' + listId + '/permissions');
  }
}
