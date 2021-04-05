import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsUrl = 'api/posts';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // The error should be sent to remote logging infrastructure
      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl).pipe(
      tap(() => console.log('fetched posts')),
      catchError(this.handleError<Post[]>('getPosts', []))
    );
  }

  getPost(id: number): Observable<Post> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.get<Post>(url).pipe(
      tap(() => console.log(`fetched post id=${id}`)),
      catchError(this.handleError<Post>(`getPost id=${id}`))
    );
  }

  updatePost(post: Post): Observable<any> {
    return this.http.put(this.postsUrl, post, this.httpOptions).pipe(
      tap(() => console.log(`updated post id=${post.id}`)),
      catchError(this.handleError<any>('updatePost'))
    );
  }

  /* GET posts whose author contains search term */
  searchPosts(term: string): Observable<Post[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Post[]>(`${this.postsUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? console.log(`found posts matching "${term}"`)
          : console.log(`no posts matching "${term}"`)
      ),
      catchError(this.handleError<Post[]>('searchPosts', []))
    );
  }
}
