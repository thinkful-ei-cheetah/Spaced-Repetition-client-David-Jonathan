import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Required, Label } from '../Form/Form'
import AuthApiService from '../../services/auth-api-service'
import Button from '../Button/Button'
import './RegistrationForm.css'

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => { }
  }

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { name, username, password } = ev.target
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
      .then(user => {
        name.value = ''
        username.value = ''
        password.value = ''
        this.props.onRegistrationSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  componentDidMount() {
    this.firstInput.current.focus()
  }

  render() {
    const { error } = this.state
    return (
      <div className="max-w-md mx-auto">
      <form
        onSubmit={this.handleSubmit}
      >
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <div role='alert'>
          {error && <p>{error}</p>}
        </div>

        <div class="mb-4">
          <Label htmlFor='registration-name-input' className="block text-grey-darker text-sm font-bold mb-2" >
            Enter your name<Required />
          </Label>
          <Input
            ref={this.firstInput}
            id='registration-name-input'
            name='name'
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          />
        </div>

        <div class="mb-4">
          <Label htmlFor='registration-username-input' className="block text-grey-darker text-sm font-bold mb-2" >
            Choose a Username<Required />
          </Label>
          <Input
            ref={this.firstInput}
            id='registration-username-input'
            name='username'
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          />
        </div>

        <div class="mb-4">
          <Label htmlFor='registration-username-input' className="block text-grey-darker text-sm font-bold mb-2" >
          Choose a password<Required />
          </Label>
          <Input
            id='registration-password-input'
            name='password'
            type='password'
            required
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
          />
        </div>

        <footer>
        <div class="flex items-center justify-between">

       <Button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Sign Up
          </Button>
          <Link to='/login' className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Already have an account?
            </Link>
        </div>
        </footer>
        </div>
      </form>
      </div>
    )
  }
}

export default RegistrationForm
