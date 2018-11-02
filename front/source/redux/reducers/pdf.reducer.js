// ACTION TYPES
const ADD_PDF_LINK = `ADD_PDF_LINK`

// INITIAL STATE
const initialState = {
  pdfLink: ``
}

// REDUCER
export default function (pdfLink = initialState, action) {

  const {type, payload} = action

  switch (type) {

    case ADD_PDF_LINK:
    return {
      pdfLink: payload.pdfLink
    }

  default:
    return pdfLink
  }

}

// ACTION CREATORS
export function addPdfLink(pdfLink) {
  return dispatch => {
    return dispatch({
      type: `ADD_PDF_LINK`,
      payload: {pdfLink}
    })
  }
}
