
import {BASE_URL} from "../../utils/routesBack"
import axios from 'axios'

import {history} from '../../history'

// ACTION TYPES
const GET_PAGE_CONTENT_ENTERPRENEUR = `GET_PAGE_CONTENT_ENTERPRENEUR`

// INITIAL STATE
const initialState = {
  // investor or enterpreneur
  userType:  window.localStorage.getItem(`user-type`),
  userId: window.localStorage.getItem(`user-id`),
}

// REDUCER
export default function (pageData = initialState, action) {

  const {type, payload} = action

  switch (type) {

  case GET_PAGE_CONTENT_ENTERPRENEUR:
    return {
      ...pageData,
      ...payload,
    }

  case `RESET_PAGE_CONTENT`: {
    return {
      userType: pageData.userType,
      userId: pageData.userId,
    }
  }

  case `SIGN_UP`: {

    return {
      ...pageData,
      userType: action.user,
    }
  }

  default:
    return pageData
  }

}

//ACTION CREATORS
export function getPageContentEnterpreneur(lang, path) {

  return function (dispatch) {
    fetch(`${BASE_URL}/${path}`, {
      method: `GET`,
      headers: {
        'token': window.localStorage.getItem('user-token'),
        'language': lang
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        if (response.status >= 400) {
          throw Error(`Cannot get data`)
        }
        return response
      })
      .then(response => response.json())
      .then(jsonData => dispatch({type: GET_PAGE_CONTENT_ENTERPRENEUR, payload: jsonData.data})
      )
      .catch(error => console.error(error.message))
  }
}

// export function signUp(user) {
//   return dispatch => {

//     let newPath

//     dispatch({type: `SIGN_UP`, user})
//     if (user === `investor`) {
//       newPath = `dash/investor/1/purchasedprojects/`
//     } else {
//       newPath = `dash/enterpreneur/1/projects`
//     }

//     history.replace(newPath)
//   }
// }

// export function resetPageContent() {
//   return dispatch => {
//     return dispatch({type: `RESET_PAGE_CONTENT`})
//   }
// }
