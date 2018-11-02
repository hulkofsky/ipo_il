// ACTION TYPES
import {BASE_URL} from "../../utils/routesBack"

const GET_TEAM_MEMBER = `GET_TEAM_MEMBER`

// INITIAL STATE
const initialState = {
  
}

// REDUCER
export default function (state = initialState, action) {

  const {type, payload} = action

  switch (type) {

  case GET_TEAM_MEMBER:
    return payload

  default:
    return state
  }

}

//ACTION CREATORS

export function getTeamMember(lang, path) {

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
      .then(jsonData => dispatch({type: GET_TEAM_MEMBER, payload: jsonData.data})
      )
      .catch(error => console.error(`---TEAM-MEMBER-ERROR!!!`, error.message))


  }
}