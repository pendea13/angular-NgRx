import { PostState } from '.';
import { ActionType, PostActions } from './post.action';

const initialState: PostState = {
  posts: {},
  page: 0,
  loading: false,
  loaded: false,
  selectedPost: null
};

export const postReducer: (state: PostState, action: ActionType) => PostState = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case PostActions.LOAD_POSTS:
      return { ...state, loading: true, loaded: false };
    case PostActions.LOAD_POST:
      return {
        ...state,
        selectedPost: action.payload,
        loading: true,
        loaded: false
      };
    case PostActions.CREATE_POST:
      return { ...state, loading: true, loaded: false };
    case PostActions.UPDATE_POST:
      return { ...state, loading: true, loaded: false };
    case PostActions.DELETE_POST:
      return { ...state, loading: true, loaded: false };
    case PostActions.LOAD_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload.reduce(
          (acc, post) => ({ ...acc, [post.id]: post }),
          state.posts
        ),
        loading: false,
        loaded: true
      };
    case PostActions.LOAD_POST_SUCCESS:
      return {
        ...state,
        posts: action.payload
          ? { ...state.posts, [action.payload.id]: action.payload }
          : state.posts,
        loading: false,
        loaded: true
      };
    case PostActions.CREATE_POST_SUCCESS:
      return {
        ...state,
        posts: { ...state.posts, [action.payload.id]: action.payload },
        selectedPost: action.payload.id,
        loading: false,
        loaded: true
      };
    case PostActions.UPDATE_POST_SUCCESS:
      return {
        ...state,
        posts: { ...state.posts, [action.payload.id]: action.payload },
        selectedPost: action.payload.id,
        loading: false,
        loaded: true
      };
    case PostActions.DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: Object.keys(state.posts)
          .filter(key => key !== action.payload)
          .reduce((acc, key) => ({ ...acc, key: state[key] }), {}),
        loading: false,
        loaded: true
      };
    default:
      return state;
  }
};
