import {Component, Input, OnInit} from '@angular/core';

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

  isComponentDisabled = false;

  /* Extendable List -> shows Prio bzw. Expiration Date
     Popup when Edit List
   */

  constructor() { }

  handleClick() {
    this.itemChecked = !this.itemChecked;
    this.isComponentDisabled = !this.isComponentDisabled;
  }

  deleteItem() {

  }

  editItem() {

  }

  ngOnInit() {
  }

}
