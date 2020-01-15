import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemService} from '../services/item.service';
import {ItemDialogComponent} from '../item-dialog/item-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.scss']
})
export class SingleItemComponent implements OnInit {

  @Input()
  itemName;
  @Input()
  itemCount;
  @Input()
  itemPriority;
  @Input()
  itemChecked;
  @Input()
  itemId;
  @Input()
  listType;
  @Input()
  listId;
  @Input()
  itemExpires;

  dayExpries;

  @Output() refreshParent: EventEmitter<any> = new EventEmitter();


  /* Extendable List -> shows Prio bzw. Expiration Date
     Popup when Edit List
   */

  constructor(private itemService: ItemService, public dialog: MatDialog) {
  }

  handleClick() {

  }


getExpireDateDays() {
  return (Math.floor((<any>new Date() - <any>new Date(this.itemExpires)) / (1000*60*60*24))) * (-1);
}

  deleteItem() {
    this.itemService.deleteItemById(this.itemId).subscribe(result => this.refreshParent.emit(this.itemId));
  }

  editItem() {
    this.openItemDialog();
  }

  ngOnInit() {
    this.dayExpries = this.getExpireDateDays();
  }


  openItemDialog() {
    const dialogWidth = '300px';
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      width: dialogWidth,
      data: {
        itemName: this.itemName,
        itemCount: this.itemCount,
        itemPriority: this.itemPriority,
        itemChecked: this.itemChecked,
        listType: this.listType,
        itemId: this.itemId,
        itemList: this.listId,
        updateevent: this.refreshParent,
        itemExpires: this.itemExpires
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.ngOnInit();
    });
  }


}
