export interface FilterType {
  id: number;
  label: string;
  value: string;
}

export interface createContentParams {
  caption: string;
  author: string;
  image: string;
  tags: string[];
}
