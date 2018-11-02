// ACTION TYPES
const CHANGE_SEARCH_FIELD = `CHANGE_SEARCH_FIELD`

// INITIAL STATE
const initialState = {
  
}

// REDUCER
export default function (state = initialState, action) {

  const {type, string} = action

  switch (type) {

  case CHANGE_SEARCH_FIELD:
    return string

  default:
    return state
  }

}

//ACTION CREATORS

export function changeSearchField(str) {

  return function (dispatch) {
    dispatch({type: CHANGE_SEARCH_FIELD, string: str})

  }
}