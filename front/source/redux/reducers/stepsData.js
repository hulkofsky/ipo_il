// ACTION TYPES
const GET_DATA = `GET_DATA`

// INITIAL STATE
const initialState = Object.create(null)

// REDUCER
export default function (data = initialState, action) {

  const {type, payload} = action

  switch (type) {

  case GET_DATA:
    return {
      ...data,
      project: payload.project,
      branch: payload.branch
    }

  default:
    return data
  }

}

// ACTION CREATORS
export function getData(project, branch) {
  return {
    type: GET_DATA,
    payload: {
      project,
      branch
    }
  }
}