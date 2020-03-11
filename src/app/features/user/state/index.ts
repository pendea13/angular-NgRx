import * as Store from '../../../store';
import {UserInterface} from '../../../models/user';

export interface UserState {
  loading: boolean;
  loaded: boolean;
  users: UserInterface[];
  page: number;
}

export interface AppState extends Store.AppState {
  users: UserState;
}
