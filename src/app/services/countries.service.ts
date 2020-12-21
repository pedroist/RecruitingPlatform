import { ICountry } from './../models/ICountry';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { PostsService } from './posts.service';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private countriesSource = new BehaviorSubject<ICountry[]>([]);
  countriesReference = this.countriesSource.asObservable();

  countryMap = new Map();
  countryList: ICountry[] = [];

  constructor(private postsService: PostsService) { }

  initializeCountrySource() {
    //Initialize CountryList Source
    this.postsService.postsReference.subscribe(postList => {
      postList.map(post => {
        //Check if country is already on map
        if (post.country && !this.countryMap.has(post.country.code)) {
          //if not in the map add country to map
          this.countryMap.set(post.country.code, post.country.name);

          //Add country to list of countries reference:
          this.addCountryToSource(post.country);
        }
      });
    });
  }

  addCountryToSource(country: ICountry) {
    if (country) {
      this.countryList.push(country);

      //Add new array to Source
      this.countriesSource.next(this.countryList);
    }
  }

}
