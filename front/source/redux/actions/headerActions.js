import { header } from '../constants';

export function toggleHeaderMenu() {
  return dispatch => {
    return dispatch({type: header.toggleMenu})
  }
}

export function changeFilter(filterObj) {
  return dispatch => {
    return dispatch({type: header.changeFilter, filterObj})
  }
}
