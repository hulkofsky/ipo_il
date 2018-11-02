export const capitalizeFirstLetter = string => string[0].toUpperCase() + string.slice(1)

const getType = data => Object.prototype.toString.call(data).slice(8, -1).toLowerCase()

export const dataToSubmit = state => {
  return new Promise((resolve, reject) => {
    const data = {}

    for (const key in state) {
      if (state.hasOwnProperty(key)) {

        if (getType(state[key]) === `array`) {
          data[key] = state[key].map(item => {
            return {
              first_name: item.first_name.value,
              last_name: item.last_name.value,
              position: item.position.value,
              fb_link: item.fb_link.value,
              linkedin_link: item.linkedin_link.value,
              photo: item.photo.value
            }
          })

        } else {
          if (key === `download`) continue
          if (key === `confirmPassword`) continue
          if (
            key === `funding_sum` ||
            key === 'last_year_sales'
          ) {
            data[key] = state[key].value.replace(/,/g, '')
          }
          data[key] = state[key].value
        }

      }
    }

    resolve(data)
  })
}

const checkTeamMembers = team => {
  const array = []

  for (const member in team) {
    if (team.hasOwnProperty(member)) {
      array.push(team[member].length)
    }
  }

  return array.includes(false)
}

export const formDataToSubmit = state => {
  return new Promise((resolve, reject) => {

    const data = {}
    const formData = new FormData()

    for (const key in state) {
      if (state.hasOwnProperty(key)) {

        if (getType(state[key]) === `array`) {

          data[key] = state[key].map(item => {
            return {
              first_name: item.first_name.value,
              last_name: item.last_name.value,
              position: item.position.value,
              fb_link: item.fb_link.value,
              linkedin_link: item.linkedin_link.value,
              photo: item.photo.value
            }
          })


          if (data.team_members[0].first_name !== `` || data.team_members[0].last_name !== `` || data.team_members[0].position !== ``) {
            formData.append(`team_members`, JSON.stringify(data.team_members))
          }


        } else {
          if (key === `download`) continue
          if (key === `confirmPassword`) continue

          if (
            key === `funding_sum` ||
            key === 'last_year_sales'
          ) {
            formData.append(
              key,
              state[key].value
                .replace(/,/g, '')
                .replace(/NIS/g, '')
            )
          } else {
            formData.append(key, state[key].value)
          }

        }

      }
    }

    resolve(formData)
  })
}

export const imageToBase64 = image => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(image)
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = error => {
      reject(error)
    }
  })
}