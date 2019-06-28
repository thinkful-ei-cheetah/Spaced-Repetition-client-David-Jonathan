import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'

class LoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    history.push(destination)
  }

  render() {
    return (
      <section className="container mx-auto">
            <h2 className="max-w-md mx-auto text-center text-2xl text-blue-800 pt-10 pb-10">
         Login
        </h2>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </section>
    );
  }
}

export default LoginRoute
