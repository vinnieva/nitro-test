import { Post } from './../models/post.model';
import { POSTS } from '../mock-data/posts.mock';
import * as Utils from './utils';
import { GroupedBy } from '../enums/groupBy.enum';

describe('Utils', () => {
  it('should map year week and formatted time', () => {
    const result = Utils.mapYearWeek(POSTS[1]);
    const expectedObj: Post = {
      id: 2,
      location: 'San Francisco',
      time: '23-Apr-2021',
      author: 'Happy User',
      text:
        'The modern workplace is increasingly digital, and workflows are constantly evolving. ',
      yearWeek: '2021-17',
    };

    expect(result).toEqual(expectedObj);

    const getFormatDateSpy = jasmine
      .createSpy('getFormatDate')
      .and.returnValue('22-Apr-2021');
    const getYearWeekSpy = jasmine
      .createSpy('getYearWeek')
      .and.returnValue('2021-17');
    spyOnProperty(Utils, 'getFormatDate', 'get').and.returnValue(
      getFormatDateSpy
    );
    spyOnProperty(Utils, 'getYearWeek', 'get').and.returnValue(getYearWeekSpy);
  });

  it('should format the date as DD-MMM-YYYY', () => {
    const result = Utils.getFormatDate('1619132400000');
    const yearWeek = '23-Apr-2021';
    expect(result).toEqual(yearWeek);
  });

  it('should get week of year', () => {
    const result = Utils.getYearWeek('1619132400000');
    const newTime = '2021-17';
    expect(result).toEqual(newTime);
  });

  it('should fill the parent node', () => {
    const result = Utils.fillParent([], 'San Francisco');
    const tree_data = [
      {
        name: 'San Francisco',
        id: -1,
        children: [],
      },
    ];
    expect(result).toEqual(tree_data);
  });

  it('should group posts ', () => {
    const result = Utils.groupItemsBy(POSTS[1], GroupedBy.Date);
    expect(result).toEqual(POSTS[1].yearWeek);
  });
});
