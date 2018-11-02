// ACTION TYPES
import {BASE_URL} from "../../utils/routesBack"

const GET_MY_PROFILE = `GET_MY_PROFILE`

// INITIAL STATE
const initialState = {
  
}

// REDUCER
export default function (state = initialState, action) {

  const {type, payload} = action

  switch (type) {

  case GET_MY_PROFILE:
    return payload

  case 'CLEAR_TEAM_MEMBERS':
    return {
      ...state,
      profile: {
        ...state.profile,
        team_members: {}
      }

    }

  default:
    return state
  }

}

//ACTION CREATORS

export function clearTeamMembers() {
    return dispatch => {
      return dispatch({type: 'CLEAR_TEAM_MEMBERS'})
    }
}

export function getMyProfileData(lang, path) {

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
      .then(jsonData => dispatch({type: GET_MY_PROFILE, payload: jsonData.data})
      )
      .catch(error => console.error(`---MY-PROFILE-ERROR!!!`, error.message))


  }
}


// export function getMyProfileData(lang, path) {

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
//       .then(jsonData => dispatch({type: GET_PROJECTS, payload: jsonData.data})
//       )
//       .catch(error => console.error(`---PAGE-PROJECTS-ERROR!!!`, error.message))


//   }
// }