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
  }

}
