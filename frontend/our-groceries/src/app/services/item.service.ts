import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) {
  }

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
    return this.http.delete('/api/item/' + id + '/delete').subscribe(result => console.log("deleted"));
  }
}


