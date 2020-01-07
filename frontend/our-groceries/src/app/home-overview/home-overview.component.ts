import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home-overview',
  templateUrl: './home-overview.component.html',
  styleUrls: ['./home-overview.component.scss']
})
export class HomeOverviewComponent implements OnInit {

  listOptions;

  listId1;
  listId2;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    const data = this.route.snapshot.data;
    this.listOptions = data.listOptions;
  }

  onListSwipe(event) {
    // alert("swipe");
  }

  newList() {
    this.router.navigate(['/list-form']);
  }

}
