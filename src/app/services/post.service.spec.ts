import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { POSTS } from '../mock-data/posts.mock';

import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService],
    });
    service = TestBed.inject(PostService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all posts', () => {
    service.getPosts().subscribe((res: any) => {
      expect(res.payload.length).toBe(6);
      const post = res.payload.find((post) => post.id === 6);
      expect(post.author).toBe('Happy Manager');
    });

    const req = httpTestingController.expectOne('api/posts');
    expect(req.request.method).toEqual('GET');
    req.flush({ payload: Object.values(POSTS) });
  });
});
