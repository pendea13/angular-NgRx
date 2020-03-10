import {UserInterface} from './user';

export interface CommentInterface {

  id?: string;

  description: string;

  author?: UserInterface;

  updated: Date;

  created: Date;
}
export interface CommentCreateInterface {

  description: string;
}
