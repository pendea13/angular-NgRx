import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {PostInterface} from '../../../models/post';
import {UserInterface} from '../../../models/user';
import {Store} from '@ngrx/store';
import {AppState, selectCurrentPost} from '../state';
import {Router} from '@angular/router';

@Component({
  selector: 'app-selected-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  private subscription$: Subscription[];
  post: PostInterface;
  currentUser: UserInterface;
  showForm: boolean = false;
  comment = '';

  constructor(private store: Store<AppState>, private router: Router) {
  }

  ngOnInit() {
    const post$ = this.store
      .select(selectCurrentPost)
      .subscribe(post => (this.post = post));

    const user$ = this.store
      .select(state => state.auth.user)
      .subscribe(user => (this.currentUser = user));

    this.subscription$ = [post$, user$];
  }

  ngOnDestroy() {
    this.subscription$.forEach(s => s.unsubscribe());
  }

  submit() {
    console.log('submitted', this.comment);
  }
}
