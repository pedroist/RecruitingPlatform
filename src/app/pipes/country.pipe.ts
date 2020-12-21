import { ALL_COUNTRIES } from './../Constants';
import { IPost } from 'src/app/models/IPost';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'country'
})
export class CountryPipe implements PipeTransform {

  transform(posts: IPost[], countryCode: string): IPost[] {
    if (!countryCode || countryCode === ALL_COUNTRIES.CODE) {
      return posts;
    }
    return posts.filter(post => {
      if (post.country && post.country.code) {

        return post.country.code === countryCode;
      }
      return false;
    });
  }

}
