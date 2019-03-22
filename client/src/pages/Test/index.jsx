import React from 'react'
import { GoogleLogin } from 'react-google-login'
import axios from 'axios'

export default class Test extends React.Component {
  constructor(props) {
      super(props);
      this.state = { isAuthenticated: false, user: null, token: ''};
  }
  googleResponse = (response) => {
      console.log('accessToken:', response.accessToken)
      axios.post('http://localhost:5000/auth/google',
                {access_token: response.accessToken})
          .then(response => {
            console.log(response.data)
          })
          .catch(result => {
            console.log(result)
          })
  }
  render() {
    let content = !!this.state.isAuthenticated ?
    (
        <div>
            <p>Authenticated</p>
            <div>
                {this.state.user.email}
            </div>
            <div>
                <button onClick={this.logout} className="button">
                    Log out
                </button>
            </div>
        </div>
    ) :
    (
        <div>
            <GoogleLogin
                clientId="838583547829-8gj3bvmocflphb4bl8ns9c98v4h24okb.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.googleResponse}
                onFailure={this.googleResponse}
            />
        </div>
    );
    return(
      <div className="App">
        <h1> Test Page. </h1>
        {content}
      </div>
    )
  }
}
