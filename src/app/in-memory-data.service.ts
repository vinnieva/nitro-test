import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Post } from './models/post.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const posts: Post[] = [
      {
        id: 1,
        location: 'San Francisco',
        time: '1619046000000',
        author: 'Happy User',
        text:
          'Proper PDF conversion ensures that every element of your document remains just as you left it.',
      },
      {
        id: 2,
        location: 'San Francisco',
        time: '1619132400000',
        author: 'Happy User',
        text:
          'The modern workplace is increasingly digital, and workflows are constantly evolving. ',
      },
      {
        id: 3,
        location: 'San Francisco',
        time: '1619218800000',
        author: 'Happy Developer',
        text: 'Digital transformation isn’t just a buzzword',
      },
      {
        id: 4,
        location: 'Sydney',
        time: '1616371200000',
        author: 'Happy Developer',
        text:
          'An expectation of digital efficiency has become the norm in our daily lives',
      },
      {
        id: 5,
        location: 'Dublin',
        time: '1616457600000',
        author: 'Happy Manager',
        text:
          'A modern PDF annotator that can accommodate all of the cooks in a very busy kitchen is what your employees really need.',
      },
      {
        id: 6,
        location: 'Dublin',
        time: '1616544000000',
        author: 'Happy Manager',
        text:
          'An integrated productivity solution breaks information through barriers and allows workers to collaborate in real time.',
      },
    ];
    return { posts };
  }

  genId(posts: Post[]): number {
    return posts.length > 0
      ? Math.max(...posts.map((post) => post.id)) + 1
      : 11;
  }
}
