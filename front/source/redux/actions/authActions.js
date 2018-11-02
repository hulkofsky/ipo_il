import {history} from '../../history';

export function logout() {
  return dispatch => {
    history.push('/')
    return dispatch({type: 'LOGOUT'});
  }
}
