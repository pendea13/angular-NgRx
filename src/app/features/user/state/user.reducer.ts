import {UserState} from './index';
import {ActionType, UserActions} from './user.action';

const initialState: UserState = {
  loading: false,
  loaded: false,
  users: [],
  page: 0
};

export const userReducer: (state: UserState, action: ActionType) => UserState = (
  state: UserState = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case UserActions.LOAD_USERS: {
      const { page } = state;
      return { ...state, page: page + 1, loading: true, loaded: false };
    }
    case UserActions.LOAD_USER: {
      return { ...state, loading: true, loaded: false };
    }
    case UserActions.LOAD_USERS_SUCCESS: {
      const users = action.payload;
      return { ...state, users, loading: false, loaded: true };
    }
    default:
      return state;
  }
};
