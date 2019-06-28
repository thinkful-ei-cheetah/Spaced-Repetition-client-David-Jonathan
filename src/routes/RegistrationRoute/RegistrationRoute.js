import React, { Component } from 'react'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'

class RegistrationRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  handleRegistrationSuccess = () => {
    const { history } = this.props
    history.push('/login')
  }

  render() {
    return (
      <section className="container mx-auto">
      <h2 className="max-w-md mx-auto text-center text-2xl text-blue-800 pt-10 ">Sign up</h2>

        <p className="max-w-md mx-auto text-center text-2xl text-blue-800 pt-10 pb-10">
          Practice learning a language with the spaced reptition revision technique.
        </p>
      
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </section>
    );
  }
}

export default RegistrationRoute
