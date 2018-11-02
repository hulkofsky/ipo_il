
import {BASE_URL} from "../../utils/routesBack"

const axios = require('axios')
import store from '../index'
import {history} from '../../history'

// ACTION TYPES
const GET_PAGE_GLOBAL_DATA = `GET_PAGE_GLOBAL_DATA`

// INITIAL STATE
const initialState = {
  // investor or enterpreneur
  userType: 'enterpreneur',
  userId: '1',
}

// REDUCER
export default function (pageData = initialState, action) {

  const {type, payload} = action

  switch (type) {

    case GET_PAGE_GLOBAL_DATA:
      return {
        ...pageData,
        ...payload,
      }

    // case 'RESET_PAGE_CONTENT': {
    //   return {
    //     userType: pageData.userType,
    //     userId: pageData.userId,
    //   }
    // }

    // case 'SIGN_UP': {

    //   return {
    //     ...pageData,
    //     userType: action.user,
    //   }
    // }

    default:
      return pageData
  }

}

// ACTION CREATORS
export function getPageContentGlobal(lang, path) {

  return function (dispatch) {
    return new Promise(async (go, stop) => {
      try {
        let response = await axios.get(`${BASE_URL}/${path}`, {
          headers: {
            'language': lang
          }
        })
        if (response.status >= 400) throw Error(`Cannot get data`)
        response = response.data
        return go(dispatch({type: GET_PAGE_GLOBAL_DATA, payload: response.data}))
      } catch (e) {
        console.error(e.message)
        return stop(e)
      }

    })
  }
}

// export function signUp(user) {
//   return dispatch => {

//     let newPath

//     dispatch({type: 'SIGN_UP', user})
//     if (user === 'investor') {
//       newPath = 'dash/investor/1/projects/'
//     } else if (user === 'enterpreneur') {
//       newPath = 'dash/enterpreneur/1/projects'
//     }

//     const hs = history.push(newPath)
//   }
// }

// export function resetPageContent() {
//   return dispatch => {
//     return dispatch({type: 'RESET_PAGE_CONTENT'})
//   }
// }