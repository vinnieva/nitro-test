import { Post } from './../models/post.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from '../services/post.service';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { getFormatDate } from '../utils/utils';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  private postId: number;
  authorCtrl: FormControl;
  locationCtrl: FormControl;
  timeCtrl: FormControl;
  textCtrl: FormControl;
  postForm: FormGroup;
  loading = false;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    fb: FormBuilder
  ) {
    this.authorCtrl = fb.control('', Validators.required);
    this.locationCtrl = fb.control('', Validators.required);
    this.timeCtrl = fb.control('');
    this.textCtrl = fb.control('');

    this.postForm = fb.group({
      author: this.authorCtrl,
      location: this.locationCtrl,
      time: this.timeCtrl,
      text: this.textCtrl,
    });
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        tap(() => (this.loading = true)),
        map((params: ParamMap) => params.get('postId')),
        switchMap((id) => this.postService.getPost(id ? parseInt(id) : -1)),
        tap((post) => this.fillPostform(post)),
        tap(() => (this.loading = false)), // finalize
        untilDestroyed(this)
      )
      .subscribe();
  }

  fillPostform(post: Post) {
    this.postId = post.id;
    this.authorCtrl.setValue(post.author);
    this.locationCtrl.setValue(post.location);
    this.timeCtrl.setValue(getFormatDate(post.time));
    this.textCtrl.setValue(post.text);
  }

  update(): void {
    const post: Post = {
      id: this.postId,
      ...this.postForm.value,
    };
    if (this.postForm.valid) {
      this.postService.updatePost(post).pipe(untilDestroyed(this)).subscribe();
      // Optimistic way
      // Actually after the update, I could update the tree view
    }
  }
}
