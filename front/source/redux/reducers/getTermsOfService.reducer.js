// ACTION TYPES
import {BASE_URL} from "../../utils/routesBack"

const GET_TERMS_OF_SERVICE = `GET_TERMS_OF_SERVICE`

// INITIAL STATE
const initialState = {
  
}

// REDUCER
export default function (state = initialState, action) {

  const {type, payload} = action

  switch (type) {

  case GET_TERMS_OF_SERVICE:
  console.log('inside temrms reducer')
    return payload

  default:
    return state
  }

}

//ACTION CREATORS
export function getTermsOfService(lang, path) {
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
      .then(jsonData => dispatch({type: GET_TERMS_OF_SERVICE, payload: jsonData.data})
      )
      .catch(error => console.error(`---PAGE-PROJECTS-ERROR!!!`, error.message))


  }
}


// export function getTermsOfService(lang, path) {
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
//       .then(jsonData => dispatch({type: GET_TERMS_OF_SERVICE, payload: jsonData.data})
//       )
//       .catch(error => console.error(`---PAGE-PROJECTS-ERROR!!!`, error.message))


//   }
// }