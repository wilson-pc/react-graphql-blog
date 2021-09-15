export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function login(data) {
  localStorage.setItem('auth', JSON.stringify(data));
  return { type: LOGIN, payload: data };
}
export function logout() {
  localStorage.removeItem('auth');
  return { type: LOGOUT };
}
