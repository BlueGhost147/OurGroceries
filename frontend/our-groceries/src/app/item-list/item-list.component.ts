import {Component, Input, OnInit} from '@angular/core';
import {ItemService} from '../services/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  items;

  @Input()
  listId;

  @Input()
  listOptions;

  constructor(private itemService: ItemService) {
  }

  ngOnInit() {
    this.updateItems();
  }

  deleteItem(item) {
    this.itemService.deleteItem(item)
      .subscribe(() => this.ngOnInit());
  }

  updateListSelection(newListId)
  {
    this.listId = newListId;
    this.updateItems();
  }

  updateItems()
  {
    this.itemService.getItemsFromList(this.listId)
      .subscribe((response: any[]) => {
        this.items = response;
      });
  }


}
