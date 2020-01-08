import {Component, Input, OnInit} from '@angular/core';
import {ItemService} from '../services/item.service';
import {Router} from "@angular/router";

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

  constructor(private itemService: ItemService, private router: Router) {
  }

  ngOnInit() {
    this.updateItems();
  }

  deleteItem(item) {
    this.itemService.deleteItem(item)
      .subscribe(() => this.ngOnInit());
  }

  updateListSelection(newListId) {
    this.listId = newListId;
    this.updateItems();
  }

  updateItems() {
    if (this.listId !== undefined) {

      this.itemService.getItemsFromList(this.listId)
        .subscribe((response: any[]) => {
          this.items = response;
        });
    }
  }

  newItem() {

  }

  editList() {
    this.router.navigate(['/list-form/' + this.listId]);
  }


}
