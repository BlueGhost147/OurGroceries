import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ItemService} from '../services/item.service';

export interface DialogData {
  itemName;
  itemCount;
  itemPriority;
  itemChecked;
  listType;
  itemId;
}

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.scss']
})
export class ItemDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private itemService: ItemService
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveItem() {
    if (this.data.itemId === undefined) {
      this.itemService.createItem({})
        .subscribe(() => console.log('Created item'));
    } else {
      this.itemService.updateItem({id: this.data.itemId, name: this.data.itemName, amount: this.data.itemCount})
        .subscribe(() => console.log('Updated item'));
    }
  }


  ngOnInit(): void {

  }

}
