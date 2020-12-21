import { IPost } from './../../models/IPost';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  @Input() postsList: IPost[];
  @Input() countryFilter: string;
  @Input() departmentFilter: string;

  constructor() { }

  ngOnInit() {
  }

}
