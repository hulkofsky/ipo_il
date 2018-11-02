// array to object
export const convertArrayToObject = array => {
  return array.reduce((accumulator, currentValue, index) => {
    accumulator[index] = currentValue
    return accumulator
  }, {})
}

// object to array
export const convertObjectToArray = object => {
  return Object.keys(object).map((key) => object[key])
}

// array to array of arrays
const calculateIterationNumber = (array, number) => {
  if (number === 1) return number
  if (array.length % number > 0 && number !== 1) return Math.floor((array.length / number)) + 1
  return array.length / number
}

export const convertArrayToArrayArrays = (array, amount) => {
  let iterations = calculateIterationNumber(array, amount)
  const resultArray = []
  let startIndex = 0
  let endIndex = amount

  for (let i = 0; i < iterations; i++) {
    resultArray.push(array.slice(startIndex, endIndex))
    startIndex = endIndex
    endIndex += amount
  }

  return resultArray
}

// format number to money
export const numberWithCommas = (number) => {
  return number
    .toString()
    .replace(/,/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// format money to number
export const numberWithoutCommas = (number) => {
  return number
    .toString()
    .replace(/,/g, '')
}