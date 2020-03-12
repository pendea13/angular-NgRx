import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState, LoadPosts, selectAllPosts, selectPostLoader} from '../state';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {PostInterface} from '../../../models/post';
import {UserInterface} from '../../../models/user';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {
  posts: Observable<PostInterface[]>;
  loader: Observable<boolean>;
  auth$: Subscription;
  currentUser: UserInterface;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new LoadPosts());
    this.posts = this.store.select(selectAllPosts);
    this.loader = this.store.select(selectPostLoader);
    this.auth$ = this.store
      .select(state => state.auth.user)
      .subscribe(val => (this.currentUser = val));
  }

  ngOnDestroy() {
    this.auth$.unsubscribe();
  }
}
