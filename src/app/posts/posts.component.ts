import { GroupedBy } from './../enums/groupBy.enum';
import { createTree, groupItemsBy, mapYearWeek } from './../utils/utils';
import { Post } from './../models/post.model';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import {
  MatTreeFlattener,
  MatTreeFlatDataSource,
} from '@angular/material/tree';
import { PostFlatNode, PostNode } from '../models/postNode.model';
import { PostService } from '../services/post.service';
import { groupBy, mergeMap, shareReplay, tap, toArray } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  groupedBy = GroupedBy;
  groupBy = GroupedBy.Date;

  private _transformer = (node: PostNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      id: node.id,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<PostFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    //grouped by week
    this.treeViewBy(this.groupedBy.Date);
  }

  treeViewBy(groupedBy: string) {
    this.dataSource.data = [];
    this.postService
      .getPosts()
      .pipe(
        mergeMap((res) => res.map(mapYearWeek)),
        groupBy((post: Post) => groupItemsBy(post, groupedBy)),
        mergeMap((group) => group.pipe(toArray())),
        tap((group) => {
          this.dataSource.data = [
            ...this.dataSource.data,
            ...createTree(group, groupedBy),
          ];
        }),
        shareReplay(1),
        untilDestroyed(this)
      )
      .subscribe();
  }

  hasChild = (_: number, node: PostFlatNode) => node.expandable;
}
