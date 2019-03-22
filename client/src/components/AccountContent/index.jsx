import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './account_content.scss'

class AccountContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      clicked: false
    }
  }
  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }
  handleSubmit(e) {
    if(this.state.value.length > 0) {
      e.preventDefault()
      this.setState({
        clicked: true
      })
      this.props.updateUsername(this.state.value)
      console.log(this.state.value)
    }
  }
  userLogout() {
    this.props.signOut()
  }
  render() {
    let clicked = this.state.clicked
    let gmail = this.props.gmail
    let username = this.props.username.length > 0 ? this.props.username
                                                  : gmail.split('@')[0]
    return(
      <div className="account-content-wrapper">
        <div className="account-gmail">
          <h1> My Account </h1>
          <p> Account you've added to Madboos </p>
          <div className="gmail-button">
            <img src="/images/google_logo.png" />
            <h1> Google </h1>
            <p> { gmail } </p>
          </div>
        </div>
        <div className="account-username">
          <h1> User Name </h1>
          <div className="username-form">
            <input type="text"
                   placeholder={username}
                   value={this.state.value}
                   onChange={(e) => this.handleChange(e)}  />
            <button className={(clicked ? 'clicked' : '')}
                    onClick={(e) => this.handleSubmit(e)}>
              {clicked ? 'Saved!' : 'Save'}
            </button>
          </div>
        </div>
        <div className="account-signout">
          <button onClick={()=>this.userLogout()}> Sign Out </button>
        </div>
        <div className="terms-of-use">
          <FontAwesomeIcon icon="file-signature" />
          <a href="/terms-of-use"> Terms of Service </a>
          <div> and </div>
          <a href="/privac-ypolicy"> Privacy Policy </a>
        </div>
      </div>
    )
  }
}

export default AccountContent
