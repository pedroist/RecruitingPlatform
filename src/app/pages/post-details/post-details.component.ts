import { PostsService } from './../../services/posts.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost } from 'src/app/models/IPost';

@Component({
  selector: 'post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  post: IPost;
  companyDescription: string;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    //Get id from the router
    const id = this.route.snapshot.paramMap.get('id');

    //Get by its ID in order to get the rest of the infos to fill the post object
    this.postsService.getPostById(id).subscribe(postJSON => {

      this.post = this.postsService.jsonToPostMapper(postJSON);
      this.companyDescription = this.post.companyDescription;
    });
  }

}
