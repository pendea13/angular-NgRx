import * as Store from '../../../store';
import {PostInterface} from '../../../models/post';
import {Entity} from '../../../models/entity';

export interface PostState {
  posts: Entity<PostInterface>;
  page: number;
  loading: boolean;
  loaded: boolean;
  selectedPost?: string;
}

export interface AppState extends Store.AppState {
  posts: PostState;
}

export * from './post.action';
export * from './post.effects';
export * from './post.reducer';
export * from './post.selector';
