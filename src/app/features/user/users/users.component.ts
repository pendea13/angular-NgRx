import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LoadUsers } from '../state/user.action';
import { selectUsers } from '../state/user.selector';
import {UserInterface} from '../../../models/user';
import {AppState} from '../../../store';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: Observable<UserInterface[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new LoadUsers());
    this.users = this.store.select(selectUsers);
  }
}
