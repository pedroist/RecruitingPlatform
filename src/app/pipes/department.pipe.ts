import { ALL_DEPARTMENTS } from './../Constants';
import { IPost } from 'src/app/models/IPost';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'department'
})
export class DepartmentPipe implements PipeTransform {

  transform(posts: IPost[], departmentId: string): IPost[] {
    if (!departmentId || departmentId === ALL_DEPARTMENTS.ID) {
      return posts;
    }
    return posts.filter(post => {
      if (post.department && post.department.id) {

        return post.department.id === departmentId;
      }
      return false;
    });
  }

}
