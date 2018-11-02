import axios from 'axios'
import { history } from '../../history'

// ACTION TYPES
const AUTH_REQUEST = `AUTH_REQUEST`
const AUTH_SUCCESS = `AUTH_SUCCESS`
const AUTH_ERROR = `AUTH_ERROR`
const AUTH_LOGOUT = `AUTH_LOGOUT`
const AUTH_PROFILE = `AUTH_PROFILE`
const AUTH_TOKEN = `AUTH_TOKEN`

// INITIAL STATE
const initialState = {
  token: window.localStorage.getItem(`user-token`) || null,
  loading: false,
  profile: window.localStorage.getItem(`user-name`) || {},
  userType: window.localStorage.getItem(`user-type`) || null
}

// REDUCER
export default function (state = initialState, action) {

  const {type, payload} = action

  switch (type) {

  case AUTH_SUCCESS:
    return {
      ...state,
      loading: false
    }

  case AUTH_ERROR:
    return {
      ...state,
      loading: false
    }

  case AUTH_REQUEST:
    return {
      ...state,
      loading: true
    }

  case AUTH_LOGOUT:
    return {
      ...state,
      token: null,
      profile: {}
    }

  case AUTH_PROFILE:
    return {
      ...state,
      profile: payload.userProfile
    }

  case AUTH_TOKEN:
    return {
      ...state,
      token: payload.userToken
    }

  default:
    return state
  }

}

// ACTION CREATORS
export const logout = () => dispatch => {
  dispatch({type: AUTH_LOGOUT})
  window.localStorage.removeItem(`user-token`)
  window.localStorage.removeItem(`user-name`)
  window.localStorage.removeItem(`user-type`)
  window.localStorage.removeItem(`user-id`)
  window.localStorage.removeItem(`user-email`)
  window.localStorage.removeItem(`user-phone`)
  window.localStorage.removeItem(`user-first-name`)
  window.localStorage.removeItem(`user-last-name`)
  window.localStorage.removeItem(`user-bank`)
  window.localStorage.removeItem(`user-account`)
  window.sessionStorage.clear()
  history.replace(`/`)
}

export const loginSuccess = responseData => dispatch => {
  dispatch({
    type: AUTH_PROFILE,
    payload: {userProfile: responseData.data.user}
  })
  dispatch({
    type: AUTH_TOKEN,
    payload: {userToken: responseData.data.token}
  })
  axios.defaults.headers.common[`token`] = responseData.data.token
}

export const authRequest = () => dispatch => {
  dispatch({type: AUTH_REQUEST})
}

export const authSuccess = () => dispatch => {
  dispatch({type: AUTH_SUCCESS})
}

export const authError = () => dispatch => {
  dispatch({type: AUTH_ERROR})
}
