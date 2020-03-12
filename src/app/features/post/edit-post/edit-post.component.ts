import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {AppState, selectCurrentPost, selectPostLoader, UpdatePost} from '../state';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {withLatestFrom} from 'rxjs/operators';
import {PostDTO, PostInterface} from '../../../models/post';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit, OnDestroy {

  private subscription$: Subscription;
  post: PostInterface;
  loader: Observable<boolean>;
  processSubmission = false;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.loader = this.store.select(selectPostLoader);

    this.subscription$ = this.store
      .select(selectCurrentPost)
      .pipe(withLatestFrom(this.store))
      .subscribe(([post, store]) => {
        const currentUser = store.auth.user;
        this.post = post;
        if (currentUser && post && post.author.id !== currentUser.id) {
          this.router.navigate(['/posts']);
        }
      });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  submit(e: PostDTO) {
    this.processSubmission = true;
    this.store.dispatch(new UpdatePost({ ...e, id: this.post.id }));
    this.router.navigate(['/posts', this.post.id]);
  }
}
