import { Post } from "../post.entity";

export interface PostGetAllInterface {
  result: Post[];
  total: number
}