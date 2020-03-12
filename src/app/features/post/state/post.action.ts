import { Action } from '@ngrx/store';
import {PostDTO, PostInterface} from '../../../models/post';

export enum PostActions {
  LOAD_POSTS = '[Post] Load posts',
  LOAD_POSTS_SUCCESS = '[Post] Load posts success',

  LOAD_POST = '[Post] Load post',
  LOAD_POST_SUCCESS = '[Post] Load post success',

  CREATE_POST = '[Post] Create post',
  CREATE_POST_SUCCESS = '[Post] Create post success',

  UPDATE_POST = '[Post] Update post',
  UPDATE_POST_SUCCESS = '[Post] Update post success',

  DELETE_POST = '[Post] Delete post',
  DELETE_POST_SUCCESS = '[Post] Delete post success',
}

export class LoadPosts implements Action {
  readonly type = PostActions.LOAD_POSTS;
}

export class LoadPostsSuccess implements Action {
  readonly type = PostActions.LOAD_POSTS_SUCCESS;
  constructor(public payload: PostInterface[]) {}
}

export class LoadPost implements Action {
  readonly type = PostActions.LOAD_POST;
  constructor(public payload: string) {}
}

export class LoadPostSuccess implements Action {
  readonly type = PostActions.LOAD_POST_SUCCESS;
  constructor(public payload?: PostInterface) {}
}

export class CreatePost implements Action {
  readonly type = PostActions.CREATE_POST;
  constructor(public payload: PostDTO) {}
}

export class CreatePostSuccess implements Action {
  readonly type = PostActions.CREATE_POST_SUCCESS;
  constructor(public payload: PostInterface) {}
}

export class UpdatePost implements Action {
  readonly type = PostActions.UPDATE_POST;
  constructor(public payload: Partial<PostDTO>) {}
}

export class UpdatePostSuccess implements Action {
  readonly type = PostActions.UPDATE_POST_SUCCESS;
  constructor(public payload: PostInterface) {}
}

export class DeletePost implements Action {
  readonly type = PostActions.DELETE_POST;
  constructor(public payload: string) {}
}

export class DeletePostSuccess implements Action {
  readonly type = PostActions.DELETE_POST_SUCCESS;
  constructor(public payload: string) {}
}

export type ActionType =
  | LoadPosts
  | LoadPostsSuccess
  | LoadPost
  | LoadPostSuccess
  | CreatePost
  | CreatePostSuccess
  | UpdatePost
  | UpdatePostSuccess
  | DeletePost
  | DeletePostSuccess;
