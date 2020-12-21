import { IPost } from 'src/app/models/IPost';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {
  @Input() post: IPost;

  constructor() { }

  ngOnInit() {

  }

}
