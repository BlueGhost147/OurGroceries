import {Component, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {ItemService} from '../services/item.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ItemDialogComponent} from "../item-dialog/item-dialog.component";
import { EventEmitter } from '@angular/core';
import {moveItemInArray} from "@angular/cdk/drag-drop";
import {ListService} from "../services/list.service";

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

  @Input()
  position;

  @Input()
  version;

  @Output() refreshParent: EventEmitter<any> = new EventEmitter();

  constructor(private itemService: ItemService, private router: Router, public dialog: MatDialog, private listService: ListService) {
  }

  ngOnInit() {
    this.updateItems();
  }

  ngOnChanges(changes: SimpleChanges) {
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

      this.listService.setCurrentLists(this.listId, this.position).subscribe(r => console.log("Set list"));

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
      width: '300px',
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

    });
  }

  dropItem(event) {
    const listIdNew = event.container.id;
    const listIdOld = event.previousContainer.id;
    const itemId = event.item.element.nativeElement.id;
    if (listIdNew !== listIdOld) {
      this.itemService.moveItem(itemId, listIdNew).subscribe(result => {
        this.refreshParent.emit(this.listId);
      });
    }
    else {
      moveItemInArray(this.items, event.previousIndex, event.currentIndex)
    }
  }

  updatedList($event) {
    this.updateItems();
  }

}
