import { LOGIN, LOGOUT } from './action';

const INITIAL_STATE = JSON.parse(localStorage.getItem('auth')) || null;

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case LOGOUT:
      return null;

    default:
      return state;
  }
}
