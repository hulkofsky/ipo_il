import axios from "axios"

export const BASE_URL = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'http://192.168.88.170:3000' : 'http://34.199.42.221:3000'
window.localStorage.getItem(`user-token`)? axios.defaults.headers.common[`token`] = window.localStorage.getItem(`user-token`) : null

export const contacts = `contactus`
export const about = `aboutus`
export const entrepreneurSeekingFunding = `howweareworking`
export const tutorial = `howdoesitwork`
export const home = ``
export const login = `login`
export const signup = `signup`
export const projects = `projects/`



export const projectsSingle = `enterpreneur/1/myprojects`
export const terms_of_service = `enterpreneur/${window.localStorage.getItem('user-id')}/terms`
export const settings = `enterpreneur/${window.localStorage.getItem('user-id')}/settings`
export const profile = `enterpreneur/myprofile/1`


export const teamMember = `enterpreneur/1/team`
export const createNew = `enterpreneur/1/createproject`
