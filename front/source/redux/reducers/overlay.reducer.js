// ACTION TYPES
const SHOW_OVERLAY = `SHOW_OVERLAY`
const HIDE_OVERLAY = `HIDE_OVERLAY`

// INITIAL STATE
const initialState = {
  isActive: false
}

// REDUCER
export default function (state = initialState, action) {

  const {type} = action

  switch (type) {

  case SHOW_OVERLAY:
    return { isActive: true }

  case HIDE_OVERLAY:
    return { isActive: false }

  default:
    return state
  }

}

// ACTION CREATORS
export function showOverlay() {
  return {
    type: SHOW_OVERLAY
  }
}

export function hideOverlay() {
  return {
    type: HIDE_OVERLAY
  }
}