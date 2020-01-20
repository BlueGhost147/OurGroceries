import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) {

  }

  priorities = {
    1: 'Low',
    2: 'Medium',
    3: 'High'
  };


  getItemsFromList(listId) {
      return this.http.get('/api/item/list/' + listId + '/get');
  }

  createItem(item) {
    return this.http.post('/api/item/create', item);
  }

  updateItem(item) {
    return this.http.put('/api/item/' + item.id + '/update', item);
  }

  deleteItem(item) {
    return this.http.delete('/api/item/' + item.id + '/delete');
  }

  deleteItemById(id) {
    return this.http.delete('/api/item/' + id + '/delete');
  }

  getPriorityFriendlyName(number) {
    switch (number) {
      case 1: return "Low";
      case 2: return "Medium";
      case 3: return "High";
    }
  }

  moveItem(itemId, newListId)
  {
    return this.http.put('/api/item/' + itemId + '/move/'+newListId+'/',null);
  }

  setItemChecked(itemId, checked)
  {
    return this.http.put('/api/item/' +itemId+ '/checked', {'checked': checked});
  }


}


