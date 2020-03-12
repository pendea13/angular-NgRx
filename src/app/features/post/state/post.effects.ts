import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, mergeMap, catchError, map, withLatestFrom } from 'rxjs/operators';

import * as fromError from '../../../store/actions/error.action';
import * as fromPost from './post.action';
import { AppState } from '.';
import { Router } from '@angular/router';
import {ApiService} from '../../../services/api.service';

@Injectable()
export class PostEffects {
  constructor(
    private store: Store<AppState>,
    private action$: Actions,
    private api: ApiService,
    private router: Router
  ) {}

  @Effect()
  loadPosts$: Observable<Action> = this.action$.pipe(
    ofType<fromPost.LoadPosts>(fromPost.PostActions.LOAD_POSTS),
    tap(() => this.store.dispatch(new fromError.RemoveError())),
    mergeMap(action =>
      this.api.getPosts().pipe(
        map(posts => new fromPost.LoadPostsSuccess(posts)),
        catchError(err => of(new fromError.AddError(err.error)))
      )
    )
  );

  @Effect()
  loadPost$: Observable<Action> = this.action$.pipe(
    ofType<fromPost.LoadPost>(fromPost.PostActions.LOAD_POST),
    tap(() => this.store.dispatch(new fromError.RemoveError())),
    withLatestFrom(this.store),
    mergeMap(([action, state]: [fromPost.LoadPost, AppState]) => {
      const post = state.posts.posts[action.payload];
      if (post) {
        return of(new fromPost.LoadPostSuccess());
      } else {
        return this.api.getPost(action.payload).pipe(
          mergeMap(res => of(new fromPost.LoadPostSuccess(res))),
          catchError(err => of(new fromError.AddError(err.error)))
        );
      }
    })
  );

  @Effect()
  createPosts$: Observable<Action> = this.action$.pipe(
    ofType<fromPost.CreatePost>(fromPost.PostActions.CREATE_POST),
    tap(() => this.store.dispatch(new fromError.RemoveError())),
    mergeMap(action =>
      this.api.createPost(action.payload).pipe(
        map(post => new fromPost.CreatePostSuccess(post)),
        catchError(err => of(new fromError.AddError(err.error)))
      )
    )
  );

  @Effect()
  updatePosts$: Observable<Action> = this.action$.pipe(
    ofType<fromPost.UpdatePost>(fromPost.PostActions.UPDATE_POST),
    tap(() => this.store.dispatch(new fromError.RemoveError())),
    mergeMap(action =>
      this.api.updatePost(action.payload.id, action.payload).pipe(
        map(post => new fromPost.UpdatePostSuccess(post)),
        catchError(err => of(new fromError.AddError(err.error)))
      )
    )
  );

  // @Effect()
  // deletePosts$: Observable<Action> = this.action$.pipe(
  //   ofType<fromPost.DeletePost>(fromPost.PostActions.DELETE_POST),
  //   tap(() => this.store.dispatch(new fromError.RemoveError())),
  //   mergeMap(action =>
  //     this.api.deletePost(action.payload).pipe(
  //       map(post => new fromPost.DeletePostSuccess(post.id)),
  //       catchError(err => of(new fromError.AddError(err.error)))
  //     )
  //   )
  // );

  @Effect({ dispatch: false })
  createPostRedirect$ = this.action$.pipe(
    ofType<fromPost.CreatePostSuccess>(
      fromPost.PostActions.CREATE_POST_SUCCESS
    ),
    tap(action => this.router.navigate(['/posts', action.payload.id]))
  );
}
