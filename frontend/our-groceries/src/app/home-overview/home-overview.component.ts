import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home-overview',
  templateUrl: './home-overview.component.html',
  styleUrls: ['./home-overview.component.scss']
})
export class HomeOverviewComponent implements OnInit {

  listOptions;

  listId1;
  listId2;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const data = this.route.snapshot.data;
    this.listOptions = data.listOptions;
  }

}
