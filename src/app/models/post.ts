import {CommentInterface} from './comment';
import {UserInterface} from './user';

export interface PostInterface {

  id: string;

  title: string;

  description: string;

  author: UserInterface;

  comments?: CommentInterface[];

  updated: Date;

  created: Date;
}

export interface PostDTO {
  id?: string;
  title: string;
  description: string;
}
