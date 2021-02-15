import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../model/post';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = 'http://localhost:7071/api/posts/';
  public postFile: File;
  public formData: FormData;

  constructor(private httpClient: HttpClient) { }

  /**
   * Gets list of posts
   */
  getPostList(): Observable<Post[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.posts)
    );
  }


  addPost(post: Post): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl, post);
  }

  
  deletePost(postId): Observable<void>{
    return this.httpClient.delete<void>(this.baseUrl+postId);
  }

  getPost(postId): Observable<Post>{
    return this.httpClient.get<Post>(this.baseUrl+postId);
  }


  uploadPostFile(file: File): Observable<HttpEvent<any>>{
    const formData = new FormData(); 
    
    formData.append('file', file);

    //return this.httpClient.post<any>('http://localhost:7071/upload', formData)
    const req = new HttpRequest('POST', `http://localhost:7071/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpClient.request(req);
}

  resetform() {
    this.formData = new FormData(); 
  }

getPostFile(fileName: string): Observable<any>{
  return this.httpClient.get('http://localhost:7071/files/'+fileName, {responseType: 'blob'});
}

getFiles(): Observable<any> {
  return this.httpClient.get(`${this.baseUrl}/files`);
}
  
}

interface GetResponse {
  _embedded: {
    posts: Post[];
  }
}


interface GetSingleResponse {
  _embedded: {
    post: Post;
  }
}