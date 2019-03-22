import React from 'react'
import { GoogleLogin } from 'react-google-login'
import axios from 'axios'

import config from '../../config'
import { connect } from 'react-redux'
import { signIn } from '../../actions/auth'

import './login_page.scss'

class LoginPage extends React.Component {
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
                      <div className="google-auth">
                          <GoogleLogin
                              clientId={config.google.clientID}
                              buttonText="Login with Google"
                              onSuccess={this.googleResponse}
                              onFailure={this.googleResponse}
                          />
                      </div>
                  );
    return(
      <div className="login-page-wrapper">
        <div className="content">
          <img src="/images/logo.png" />
          <h1> 👋 Welcome to Journal! </h1>
          <p> When you need something, ask Journal, and it will actually find it. </p>
        </div>

        {content}

        <div className="login-svg">
          <img src="/images/undraw_authentication.svg" />
        </div>
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
)(LoginPage)
