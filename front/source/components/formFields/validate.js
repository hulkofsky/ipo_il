import message from  './validate.messages'

export const validate = (value, rules, confirmValue, min, max) => {

  let errors = []

  rules.forEach(rule => {

    switch (rule) {

      case `min`:
        (value < min) ? errors.push(`Must be more than ${min}`) : null
        break

      case `max`:
        (value > max) ? errors.push(`Must be less than ${max}`) : null
        break

    case `required`:
      !value ? errors.push(message.required) : null
      break

    case `email`:
      // eslint-disable-next-line
      !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(value) ? errors.push(message.email) : null
      break

    case `text`:
      !/^[0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(value) ? errors.push(message.text) : null
      break

    case `maxText`:
      (value.length > 255) ? errors.push(message.maxText) : null
      break

    case `minText`:
      (value.length < 8) ? errors.push(message.minText) : null
      break

    case `onlyNumber`:
      !/^[0-9]+$/g.test(value) ? errors.push(message.onlyNumber) : null
      break

    case `minCount`:
      (+value <= 0) ? errors.push(message.minCount) : null
      break

    case `lowercase`:
      !/[a-z]+/g.test(value) ? errors.push(message.lowercase) : null
      break

    case `uppercase`:
      !/[A-Z]+/g.test(value) ? errors.push(message.uppercase) : null
      break

    case `number`:
      !/[0-9]+/g.test(value) ? errors.push(message.number) : null
      break

    case `phone`:
      !/\(?([0-9]{2,3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(value) ? errors.push(message.phone) : null
      break

    case `accountNumber`:
      !/^\d{1,30}$/.test(value) ? errors.push(message.accountNumber) : null
      break

    case `vat`:
      !(value.length > 5 && value.length < 20) ? errors.push(message.vat) : null
      break

    case `money`:
      !/[0-9]+(NIS ,[0-9]+)*/g.test(value) ? errors.push(message.money) : null
      break

    case `confirmPassword`:
      value !== confirmValue ? errors.push(message.confirmPassword) : null
      break

    case `youtube`:
      !/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/.test(value) ? errors.push(message.youtube) : null
      break

    case `linkedIn`:
      ! /http(s)?:\/\/([\w]+\.)?linkedin\.com/.test(value) ? errors.push(message.linkedIn) : null
      break

    case `facebook`:
      // eslint-disable-next-line
      !/(?:https?:\/\/)?(?:www\.)?facebook\.com\/.(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/.test(value) ? errors.push(message.facebook) : null
      break

    case `maxSize`:
      value.size > 10485760 ? errors.push(message.maxSize) : null
      break

    default:
      return
    }
  })

  return errors
}

export const getValidateRules = (rules, messages = message) => {
  let data = []

  rules.forEach(ruleName => data.push(messages[ruleName]))

  return data
}