import {Component, Input, OnInit} from '@angular/core';
import {ItemService} from '../services/item.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ItemDialogComponent} from "../item-dialog/item-dialog.component";

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

  constructor(private itemService: ItemService, private router: Router, public dialog: MatDialog) {
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
    this.openItemDialog();
  }

  editList() {
    this.router.navigate(['/list-form/' + this.listId]);
  }

  openItemDialog() {
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      width: '250px',
      data: {
        itemName: '',
        itemCount: 1,
        itemPriority: undefined,
        itemChecked: false,
        listType: undefined,
        itemId: undefined,
        itemList: this.listId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }




}
