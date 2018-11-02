import axios from 'axios'
import _ from 'lodash';
// ACTION TYPES
import {BASE_URL} from "../../utils/routesBack"

const GET_PROJECTS = `GET_PROJECTS`
const CLEAR_PROJECTS = 'CLEAR_PROJECTS'
const REMOVE_TEAM_MEMBERS = 'REMOVE_TEAM_MEMBERS'
const DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS'


// INITIAL STATE
const initialState = {

}

// REDUCER
export default function (state = initialState, action) {

  const {type, payload} = action

  switch (type) {
    case DELETE_PROJECT_SUCCESS: {
      const newState = _.cloneDeep(state);
      const { projectId, projectType } = action;
      const projectListBeforeDeleting = newState.data[projectType];

      // don't send a new request to server for new data, just cut out deleted project
      newState.data[projectType] = projectListBeforeDeleting.filter(item => {
        if(item.id === projectId) {
          return false;
        } else {
          return true;
        }
      })
      return newState;
    }

  case GET_PROJECTS:
    return payload

  case REMOVE_TEAM_MEMBERS:
  console.log('From reducer remove team members')
    return {
      ...state,
      company_projects: {
        ...state.company_projects,
        team_members: {}
      }

    }

  case CLEAR_PROJECTS:
  console.log('from reducer')
    return {
      ...state,
      company_projects: {
        ...state.company_projects,
        projects: []
      }
    }

  default:
    return state
  }

}

export function removeTeamMembers() {
  return dispatch => {
    return dispatch({type: 'REMOVE_TEAM_MEMBERS'})
  }
}

export function clearProjects() {
  return dispatch => {
    return dispatch({type: 'CLEAR_PROJECTS'})
  }
}

export function getAllProjects(lang, path) {

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
      .then(jsonData => dispatch({type: GET_PROJECTS, payload: jsonData.data})
      )
      .catch(error => console.error(`---PAGE-PROJECTS-ERROR!!!`, error.message))


  }
}

export function deleteProjectSuccess(projectId, projectType) {
  return dispatch => {
    return dispatch({type: DELETE_PROJECT_SUCCESS, projectId, projectType})
  }
}
