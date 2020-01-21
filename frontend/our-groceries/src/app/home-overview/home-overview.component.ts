import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {ListService} from "../services/list.service";
import {NotificationListComponent} from "../notification-list/notification-list.component";

@Component({
  selector: 'app-home-overview',
  templateUrl: './home-overview.component.html',
  styleUrls: ['./home-overview.component.scss'],
  providers: [NotificationListComponent]
})
export class HomeOverviewComponent implements OnInit {

  listOptions;

  listId1;
  listId2;
  version1 = 0;
  version2 = 0;

  currentNotifications;


  constructor(private route: ActivatedRoute, private router: Router, private listService: ListService, private notification: NotificationListComponent) {
  }

  ngOnInit() {
    const data = this.route.snapshot.data;
    this.listOptions = data.listOptions;


    this.listService.getCurrentLists()
      .subscribe((response) => {
        this.listId1 = response[0];
        this.listId2 = response[1];
      });

    this.currentNotifications = this.notification.getCurrentNotifications()
  }

  showNotifications() {
    this.router.navigate(['/notification-list']);
  }

  getNotificationCount() {
    return this.currentNotifications;
  }


  onListSwipe(event) {
    // alert("swipe");
  }

  newList() {
    this.router.navigate(['/list-form']);
  }

  updatedLists($event) {
    this.version1++;
    this.version2++;

    this.currentNotifications = this.notification.getCurrentNotifications()
  }

}
