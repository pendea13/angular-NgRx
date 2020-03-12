import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';

import {PostDTO} from '../../../models/post';
import {AppState, CreatePost} from '../state';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent {

  constructor(private store: Store<AppState>) {
  }

  submit(e: PostDTO) {
    this.store.dispatch(new CreatePost(e));
  }
}
