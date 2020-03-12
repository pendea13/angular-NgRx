import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PostState } from '.';
import {PostInterface} from '../../../models/post';
import {Entity} from '../../../models/entity';

export const postEntityToArray = (postState: PostState) => {
  const { posts }: { posts: Entity<PostInterface> } = postState;
  return Object.keys(posts).map(id => posts[id]);
};

export const selectPostState = createFeatureSelector<PostState>('posts');

export const selectAllPosts = createSelector(
  selectPostState,
  postEntityToArray
);

export const selectPostLoader = createSelector(
  selectPostState,
  (postState: PostState) => postState.loading
);

export const selectCurrentPost = createSelector(
  selectPostState,
  (postState: PostState) => {
    const { posts, selectedPost } = postState;
    return posts[selectedPost];
  }
);
