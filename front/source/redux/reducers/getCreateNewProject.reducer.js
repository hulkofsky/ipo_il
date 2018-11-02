// ACTION TYPES
import {BASE_URL} from "../../utils/routesBack"

const CREATE_NEW_PROJECT = `CREATE_NEW_PROJECT`

// INITIAL STATE
const initialState = {
  
}

// REDUCER
export default function (state = initialState, action) {

  const {type, payload} = action

  switch (type) {

  case CREATE_NEW_PROJECT:
    return payload

  default:
    return state
  }

}

//ACTION CREATORS

export function getCreateNewProject(lang, path) {

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
      .then(jsonData => dispatch({type: CREATE_NEW_PROJECT, payload: jsonData.data})
      )
      .catch(error => console.error(`---CREATE_NEW_PROJECT-ERROR!!!`, error.message))


  }
}