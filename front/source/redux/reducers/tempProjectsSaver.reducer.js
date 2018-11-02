// ACTION TYPES
const SAVE_PROJECTS_TEMP = `SAVE_PROJECTS_TEMP`

// INITIAL STATE
const initialState = {
  
}

// REDUCER
export default function (state = initialState, action) {

  const {type, projects} = action

  switch (type) {

  case SAVE_PROJECTS_TEMP:
    return projects

  default:
    return state
  }

}

//ACTION CREATORS

export function saveProjectsTemp(proj) {

  return function (dispatch) {
    dispatch({type: SAVE_PROJECTS_TEMP, projects: proj})

  }
}