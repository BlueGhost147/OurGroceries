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

  constructor(private itemService: ItemService) {
  }

  ngOnInit() {
    this.itemService.getItemsFromList(this.listId)
      .subscribe((response: any[]) => {
        this.items = response;
      });
  }

  deleteItem(item) {
    this.itemService.deleteItem(item)
      .subscribe(() => this.ngOnInit());
  }
}
