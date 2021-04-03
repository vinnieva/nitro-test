export interface PostNode {
  name: string;
  id: number;
  children: PostNode[];
}

export interface PostFlatNode {
  expandable: boolean;
  name: string;
  id: number;
  level: number;
}
