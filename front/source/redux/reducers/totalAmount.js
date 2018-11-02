// ACTION TYPES
const ADD_TOTAL_AMOUNT = `ADD_TOTAL_AMOUNT`

// INITIAL STATE
const initialState = {
  amount: 0
}

// REDUCER
export default function (totalAmount = initialState, action) {

  const {type, payload} = action

  switch (type) {

  case ADD_TOTAL_AMOUNT:
    return payload.amount

  default:
    return totalAmount
  }

}

// ACTION CREATORS
export function addAmount(amount) {
  return {
    type: ADD_TOTAL_AMOUNT,
    payload: {amount}
  }
}