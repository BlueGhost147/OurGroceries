import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ItemService} from '../services/item.service';
import {DatePipe} from "@angular/common";

export interface DialogData {
  itemName;
  itemCount;
  itemPriority;
  itemChecked;
  listType;
  itemId;
  itemExpires;
  itemList;
  updateevent;
  itemAccepted;
  permission_level;
  listItems;
}

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.scss']
})
export class ItemDialogComponent implements OnInit {

  duplicateName;
  oddExpirationDate;

  constructor(
    public dialogRef: MatDialogRef<ItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private itemService: ItemService, public datepipe: DatePipe
  ) {
    this.onDateChange();
    this.onNameChange(data.itemName);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveItem() {
    if (this.data.itemCount > 0 && this.data.itemName && this.data.itemName !== "") {

      if (this.data.itemId === undefined) {
        this.itemService.createItem({
          name: this.data.itemName,
          amount: this.data.itemCount,
          priority: this.data.itemPriority,
          checked: this.data.itemChecked === undefined ? false : this.data.itemChecked,
          list: this.data.itemList,
          expires: this.datepipe.transform(this.data.itemExpires, 'yyyy-MM-dd'),
          accepted: this.data.itemAccepted
        })
          .subscribe(() => {
            if (this.data.updateevent !== undefined) {
              this.data.updateevent.emit(this.data.itemId)
            }
          });
      } else {
        this.itemService.updateItem({
          id: this.data.itemId,
          name: this.data.itemName,
          amount: this.data.itemCount,
          priority: this.data.itemPriority,
          checked: this.data.itemChecked === undefined ? false : this.data.itemChecked,
          list: this.data.itemList,
          accepted: this.data.itemAccepted,
          expires: this.datepipe.transform(this.data.itemExpires, 'yyyy-MM-dd'),
        })
          .subscribe(() => {
            if (this.data.updateevent !== undefined) {
              this.data.updateevent.emit(this.data.itemId)
            }
          });
      }
    }
  }


  ngOnInit(): void {

  }

  toInt(key: string) {
    return parseInt(key, 10);
  }

  onNameChange(newValue) {
    this.duplicateName = this.data.listItems.find(item => {
      return item.name.toLowerCase() === newValue.toLowerCase() && this.data.itemId !== item.id
    }) !== undefined;
  }

  onDateChange() {
    const today = new Date();
    const itemExp = new Date(this.data.itemExpires);
    today.setHours(0, 0, 0, 0);
    this.oddExpirationDate = this.data.itemExpires !== null && this.data.itemExpires !== undefined ? itemExp < today : false;
  }
}
