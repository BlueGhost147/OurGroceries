import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {ListService} from "../services/list.service";

@Component({
  selector: 'app-home-overview',
  templateUrl: './home-overview.component.html',
  styleUrls: ['./home-overview.component.scss']
})
export class HomeOverviewComponent implements OnInit {

  listOptions;

  listId1;
  listId2;
  version1 = 0;
  version2 = 0;

  expireItems = {};
  existExpireItems = false;

  constructor(private route: ActivatedRoute, private router: Router, private listService: ListService) {
  }

  ngOnInit() {
    const data = this.route.snapshot.data;
    this.listOptions = data.listOptions;


    this.listService.getCurrentLists()
      .subscribe((response) => {
        this.listId1 = response[0];
        this.listId2 = response[1];
      });
    this.checkExpireItems();
  }

  checkExpireItems() {
    this.listService.getAllItems().subscribe((response: any[]) => {
      response.forEach((itm) => {
        let temp = this.calculateExpireDateDays(itm.expires);
        //Add all items, that are about to expire to list
        if (temp <= 4) {
          this.expireItems[itm.name] = temp;
          this.existExpireItems = true;
        }
      })

    });

  }

  onListSwipe(event) {
    // alert("swipe");
  }

  calculateExpireDateDays(dt) {
    return (Math.floor((<any>new Date() - <any>new Date(dt)) / (1000 * 60 * 60 * 24))) * (-1);
  }

  newList() {
    this.router.navigate(['/list-form']);
  }

  updatedLists($event) {
    this.version1++;
    this.version2++;
  }

}
