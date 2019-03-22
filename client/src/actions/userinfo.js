import axios from 'axios'

import constants from '../constants/auth'
import config from '../config'

export function updateUsername(newUsername) {
  return function(dispatch){
    const URL = config.serverUrl + '/username'
    axios.post(URL, {newUsername: newUsername},{
      headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
      }
    })
      .then(response => {
        console.log(response.data.load)
      })
      .catch(result => {
        console.log(result)
      })
  }
}
