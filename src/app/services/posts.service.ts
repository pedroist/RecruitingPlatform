import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IPost } from '../models/IPost';
import { PostClass } from '../models/PostClass';
import { CUSTOM_FIELD_COUNTRY_ID } from '../Constants';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  url: string = 'https://api.smartrecruiters.com/v1/companies/smartrecruiters/postings';
  postsArray: IPost[] = [];

  private postsSource = new BehaviorSubject<IPost[]>([]);
  postsReference = this.postsSource.asObservable();


  constructor(private http: HttpClient) { }

  /*---HTTP REQUESTS-------------------------------------*/

  getAllPosts(): Observable<any> {
    /* OPTION1 - FROM JSON LOCAL FILE: */
    return this.getLocalJSON();

    /* // OPTION2 - FROM HTTP SERVICE:
    let data = this.http
      .get(this.url)
      .pipe(catchError(this.handleError));
    return data;
    */
  }

  getPostById(id: string): Observable<any> {
    let data = this.http
      .get(`${this.url}/${id}`)
      .pipe(catchError(this.handleError));
    return data;
  }
  /*---END OF HTTP REQUESTS-------------------------------------*/
  getPostsInitialization() {
    this.postsArray = []; //Reset array before adding new objects.

    this.getAllPosts().subscribe(data => {
      if (data && data.content) {
        data.content.map(postJSON => {
          if (postJSON) {
            //map to a Post object (model)
            this.postsArray.push(this.jsonToPostMapper(postJSON));
          }
        });

        // broadcast postsLists to other components
        this.postsSource.next(this.postsArray);
      }
    });

  }

  jsonToPostMapper(postJSON: any): IPost {
    let post: PostClass = new PostClass();

    if (postJSON.id) {
      post.id = postJSON.id;
    }
    if (postJSON.name) {
      post.name = postJSON.name;
    }
    if (postJSON.location && postJSON.location.city) {
      post.city = postJSON.location.city;
    }
    if (postJSON.customField
      && postJSON.customField.length > 1
      && postJSON.customField[1]
      && postJSON.customField[1].fieldId
      && postJSON.customField[1].fieldId === CUSTOM_FIELD_COUNTRY_ID
      && postJSON.customField[1].valueLabel) {

      post.country = {
        code: postJSON.customField[1].valueId,
        name: postJSON.customField[1].valueLabel
      };
    }
    if (postJSON.department
      && postJSON.department.id
      && postJSON.department.label) {

      post.department = {
        id: postJSON.department.id,
        name: postJSON.department.label
      };
    }
    if (postJSON.company && postJSON.company.name) {
      post.companyName = postJSON.company.name;
    }
    //Sections:
    if (postJSON.jobAd && postJSON.jobAd.sections) {
      if (postJSON.jobAd.sections.companyDescription
        && postJSON.jobAd.sections.companyDescription.text) {

        post.companyDescription = postJSON.jobAd.sections.companyDescription.text;

      }
      if (postJSON.jobAd.sections.jobDescription
        && postJSON.jobAd.sections.jobDescription.text) {

        post.jobDescription = postJSON.jobAd.sections.jobDescription.text;

      }
      if (postJSON.jobAd.sections.qualifications
        && postJSON.jobAd.sections.qualifications.text) {

        post.qualifications = postJSON.jobAd.sections.qualifications.text;

      }
      if (postJSON.jobAd.sections.additionalInformation
        && postJSON.jobAd.sections.additionalInformation.text) {

        post.additionalInfo = postJSON.jobAd.sections.additionalInformation.text;

      }
    }

    return post;
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  getLocalJSON(): Observable<any> {
    return this.http.get("assets/data.json");
  }
}
