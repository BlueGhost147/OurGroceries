import {Component, Input, OnInit} from '@angular/core';
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
  isLeft = true;


  /* Extendable List -> shows Prio bzw. Expiration Date
     Popup when Edit List
   */

  constructor(private itemService: ItemService, public dialog: MatDialog) {
  }

  handleClick() {

  }


  handleLongClick() {

  }

  moveItem() {

  }

  deleteItem() {
    this.itemService.deleteItemById(this.itemId);
    this.ngOnInit();
  }

  editItem() {
    this.openItemDialog();
  }

  ngOnInit() {

  }


  openItemDialog() {
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      width: '250px',
      data: {
        itemName: this.itemName,
        itemCount: this.itemCount,
        itemPriority: this.itemPriority,
        itemChecked: this.itemChecked,
        listType: this.listType,
        itemId: this.itemId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }


}
