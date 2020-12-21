import { IDepartment } from './../../models/IDepartment';
import { PostsService } from './../../services/posts.service';
import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/models/IPost';
import { ICountry } from 'src/app/models/ICountry';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  postsList: IPost[] = [];

  countryFilter: string;
  departmentFilter: string;

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getPostsInitialization();

    //When the posts list is inicialized or everytime the list changes its broadcasted here:
    this.postsService.postsReference.subscribe(posts => {
      this.postsList = posts;
    });
  }

  onCountryFilterChange(country: ICountry) {
    this.countryFilter = country.code;
  }

  onDepartmentFilterChange(department: IDepartment) {
    this.departmentFilter = department.id;
  }
}
