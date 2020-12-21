import { IDepartment } from './../models/IDepartment';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { PostsService } from './posts.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  private departmentsSource = new BehaviorSubject<IDepartment[]>([]);
  departmentsReference = this.departmentsSource.asObservable();

  departmentMap = new Map();
  departmentList: IDepartment[] = [];

  constructor(private postsService: PostsService) { }

  initializeDepartmentSource() {
    //Initialize DepartmentList Source
    this.postsService.postsReference.subscribe(postList => {
      postList.map(post => {
        //Check if department is already on map
        if (post.department && !this.departmentMap.has(post.department.id)) {
          //if not in the map add department to map
          this.departmentMap.set(post.department.id, post.department.name);

          //Add department to list of departments reference:
          this.addDepartmentToSource(post.department);
        }
      });
    });
  }

  addDepartmentToSource(department: IDepartment) {
    if (department) {
      this.departmentList.push(department);

      //Add new array to Source
      this.departmentsSource.next(this.departmentList);
    }
  }
}
