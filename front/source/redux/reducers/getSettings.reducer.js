// ACTION TYPES
import {BASE_URL} from "../../utils/routesBack"

const GET_SETTINGS = `GET_SETTINGS`

// INITIAL STATE
const initialState = {

}

// REDUCER
export default function (state = initialState, action) {

  const {type, payload} = action

  switch (type) {

  case GET_SETTINGS:
    return payload

  case 'RESET_SETTINGS': {
    return initialState;
  }

  default:
    return state
  }

}

export function resetSettings() {
  return dispatch => {
    return dispatch({type: 'RESET_SETTINGS'})
  }
}


// export function getSettings(lang, path) {

//   return function (dispatch) {
//     fetch(`http://192.168.88.145:3000/${path}`, {
//       method: `GET`,
//       headers: {
//         'language': lang
//       }
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw Error(response.statusText)
//         }
//         if (response.status >= 400) {
//           throw Error(`Cannot get projects`)
//         }

//         return response
//       })
//       .then(response => response.json())
//       .then(jsonData => dispatch({type: GET_SETTINGS, payload: jsonData.data})
//       )
//       .catch(error => console.error(`---PAGE-SETTINGS-ERROR!!!`, error.message))


//   }
// }


export function getSettings(lang, path) {

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
          throw Error(`Cannot get projects`)
        }

        return response
      })
      .then(response => response.json())
      .then(jsonData => dispatch({type: GET_SETTINGS, payload: jsonData.data})
      )
      .catch(error => console.error(`---PAGE-SETTINGS-ERROR!!!`, error.message))


  }
}
