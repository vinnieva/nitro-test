import * as moment from 'moment';
import { Post } from '../models/post.model';
import { PostNode } from '../models/postNode.model';

export const mapYearWeek = (post: Post): Post => {
  post.yearWeek = getYearWeek(post.time);
  post.time = getFormatDate(post.time);
  return post;
};

export const createTree = (group: Post[], groupedBy: string): PostNode[] => {
  let tree_data: PostNode[];

  switch (groupedBy) {
    case 'date':
      tree_data = fillParent([], group[0].time);
      break;
    case 'author':
      tree_data = fillParent([], group[0].author);
      break;
    case 'location':
      tree_data = fillParent([], group[0].location);
      break;
  }
  group.forEach((post: Post) => {
    tree_data[tree_data.length - 1].children.push({
      name: post.time,
      id: post.id,
      children: [],
    });
  });
  return tree_data;
};

export const getFormatDate = (time: string) =>
  moment(parseInt(time)).format('DD-MMM-YYYY');

export const getYearWeek = (time: string) =>
  `${moment(parseInt(time)).year()}-${moment(parseInt(time)).week()}`;

const fillParent = (tree_data: PostNode[], groupBy: string): PostNode[] => {
  tree_data.push({
    name: groupBy,
    id: -1,
    children: [],
  });
  return tree_data;
};

export const groupItemsBy = (post: Post, groupedBy: string) => {
  switch (groupedBy) {
    case 'date':
      return post.yearWeek;
    case 'author':
      return post.author;
    case 'location':
      return post.location;
  }
};
