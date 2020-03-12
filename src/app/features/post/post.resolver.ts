import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { take, map } from 'rxjs/operators';

import { AppState, LoadPost } from './state';

@Injectable()
export class PostResolver implements Resolve<void> {
  constructor(private store: Store<AppState>) {}

  resolve() {
    return this.store
      .select(state => state.router.state.params.id)
      .pipe(
        take(1),
        map(id => {
          this.store.dispatch(new LoadPost(id));
        })
      );
  }
}
