import {Component, OnInit} from '@angular/core';
import {ListService} from '../services/list.service';
import {ItemService} from "../services/item.service";

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {

  expireItems;


  constructor(public itemService: ItemService) {
  }

  ngOnInit() {
    this.checkExpireItems();
  }


  checkExpireItems() {
    this.itemService.getExpire().subscribe((response: any[]) => {
      this.expireItems = response;
      this.expireItems = this.expireItems.map(item => {
        item.expiresIn = this.calculateExpireDateDays(item.expires);
        return item;
      });
    });
  }


  calculateExpireDateDays(dt) {
    return (Math.floor((<any>new Date() - <any>new Date(dt)) / (1000 * 60 * 60 * 24))) * (-1);
  }

}
