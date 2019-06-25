import React, { Component } from 'react'
import { Input, Label } from '../Form/Form'
import AuthApiService from '../../services/auth-api-service'
import UserContext from '../../contexts/UserContext'
import Button from '../Button/Button'

class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => { }
  }

  static contextType = UserContext

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { username, password } = ev.target

    this.setState({ error: null })

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then(res => {
        username.value = ''
        password.value = ''
        this.context.processLogin(res.authToken)
        this.props.onLoginSuccess()
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
          className='LoginForm'
          onSubmit={this.handleSubmit}
        >
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
            <div role='alert'>
              {error && <p>{error}</p>}
            </div>

            <div className="mb-4">
              <Label htmlFor='login-username-input' className="block text-grey-darker text-sm font-bold mb-2" >
                Username
          </Label>
              <Input
                ref={this.firstInput}
                id='login-username-input'
                name='username'
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor='login-password-input' className="block text-grey-darker text-sm font-bold mb-2" >
                Password
          </Label>
              <Input
                id='login-password-input'
                name='password'
                type='password'
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              />
            </div>


            <Button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Login
          </Button>



          </div>
        </form>
      </div>
    )
  }
}

export default LoginForm
