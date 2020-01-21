import {Component, OnInit} from '@angular/core';
import {ListService} from '../services/list.service';
import {ItemService} from "../services/item.service";

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {

  notes: NotificationHelperClass[] = [];
  expireItems;


  constructor(public itemService: ItemService) {
  }

  ngOnInit() {
    this.checkExpireItems();
  }

  /*
  public getCurrentNotifications() {
    this.checkExpireItems();
    // FIXME: Value is always 0
    return this.notes.length;
  }*/

  checkExpireItems() {
    this.itemService.getExpire().subscribe((response: any[]) => {
      this.expireItems = response;
      this.expireItems = this.expireItems.map(item => {
        item.expiresIn = this.calculateExpireDateDays(item.expires);
        return item;
      });
      /*response.forEach((itm) => {
          if (itm.expires != null) {
            let temp = this.calculateExpireDateDays(itm.expires);
            // Add all items, that are about to expire to list
            if (temp <= 4) {
              this.notes.push(new NotificationHelperClass(temp, itm.name));
            }
          }
        }
      );*/
    });
  }


  calculateExpireDateDays(dt) {
    return (Math.floor((<any>new Date() - <any>new Date(dt)) / (1000 * 60 * 60 * 24))) * (-1);
  }

}

class NotificationHelperClass {
  constructor(num: number, text: String) {
    this.num = num;
    this.text = text;
  }

  public num;
  public text;
}
