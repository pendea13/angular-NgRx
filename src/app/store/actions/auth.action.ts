import { Action } from '@ngrx/store';
import {UserInterface} from '../../models/user';
import {LoginInterface, RegisterInterface} from '../../models/auth';

export enum AuthActions {
  LOGIN_USER = '[AUTH] Login user',
  REGISTER_USER = '[AUTH] Register user',
  SET_INITIAL_USER = '[AUTH] Set initial user',
  SET_CURRENT_USER = '[AUTH] Set current user'
}

export class LoginUser implements Action {
  readonly type = AuthActions.LOGIN_USER;
  constructor(public payload: LoginInterface) {}
}

export class RegisterUser implements Action {
  readonly type = AuthActions.REGISTER_USER;
  constructor(public payload: RegisterInterface) {}
}

export class SetInitialUser implements Action {
  readonly type = AuthActions.SET_INITIAL_USER;
}

export class SetCurrentUser implements Action {
  readonly type = AuthActions.SET_CURRENT_USER;
  constructor(public payload: UserInterface | null) {}
}

export type ActionType = LoginUser | RegisterUser | SetCurrentUser | SetInitialUser;
