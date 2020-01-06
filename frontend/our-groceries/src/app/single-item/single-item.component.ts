import {Component, Input, OnInit} from '@angular/core';
import {ItemService} from "../services/item.service";

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


  /* Extendable List -> shows Prio bzw. Expiration Date
     Popup when Edit List
   */

  constructor(private itemService: ItemService) { }

  handleClick() {

  }


  handleLongClick() {

  }

  deleteItem() {
    this.itemService.deleteItemById(this.itemId);
    this.ngOnInit();
  }

  editItem() {

  }

  ngOnInit() {

  }

}
