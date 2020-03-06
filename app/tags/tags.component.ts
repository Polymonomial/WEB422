import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styles: []
})
export class TagsComponent implements OnInit {
  tags: Array<string> =[
    "#funny",
    "#dramatic",
    "#rental",
    "#seeagain",
    "#spooky",
    "#worththecost",
    "#lovedIt",
    "#scary",
    "#silly",
    "#good4kidz"
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
