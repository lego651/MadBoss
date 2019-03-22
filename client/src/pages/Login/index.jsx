import React from 'react'
import { GoogleLogin } from 'react-google-login'
import axios from 'axios'

import config from '../../config'
import { connect } from 'react-redux'
import { signIn } from '../../actions/auth'

class Login extends React.Component {
  constructor() {
      super();
      this.state = { };
  }
  logout = () => {
      this.setState({isAuthenticated: false, token: '', user: null})
  };

  googleResponse = (response) => {
      // console.log('accessToken:', response.accessToken)
      axios.post('http://localhost:5000/auth/google',
                {access_token: response.accessToken})
          .then(response => {
            this.props.signIn(response.data)
          })
          .catch(result => {
            console.log(result)
          })
  }
  onFailure = (error) => {
    alert(error);
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
                              clientId={config.google.clientID}
                              buttonText="CathyLogin"
                              onSuccess={this.googleResponse}
                              onFailure={this.googleResponse}
                          />
                      </div>
                  );
    return(
      <div className="App">
        <h1> Login Page. </h1>
        {content}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  todos: state.todos
})
const mapDispatchToProps = (dispatch) => ({
  signIn: (token) => dispatch(signIn(token))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
