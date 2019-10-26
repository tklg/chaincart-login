/* global fetch */
import { h, Component } from 'preact'
import { Link } from 'preact-router/match'
import { route } from 'preact-router'
import style from './login/style'
import { api } from '../util'

class Register extends Component {
  state = {
    email: '',
    password: '',
    password_confirmation: '',
    error: ''
  }

  handleChange = (k, v) => {
    this.setState({
      [k]: v
    })
  }

  handleSubmit = async e => {
    e.preventDefault()
    this.setState({ error: '' })
    try {
      const res = await fetch(api('register'), {
        method: 'POST',
        body: JSON.stringify({
          username: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (res.status === 201) {
        route('/login')
      } else {
        throw new Error((await res.json()).message)
      }
    } catch (e) {
      this.setState({
        error: e.toString().substr(7)
      })
    }
  }

  render () {
    return (
      <div class={style.login}>
        <form onSubmit={this.handleSubmit}>
          <header className='modal-header'>
            <h1>Register</h1>
          </header>
          <input type='email' required placeholder='Email address' value={this.state.email} onChange={e => this.handleChange('email', e.target.value)} />
          <input type='password' required placeholder='Password' onChange={e => this.handleChange('password', e.target.value)} />
          <input type='password' required placeholder='Password confirmation' onChange={e => this.handleChange('password_confirmation', e.target.value)} />
          <span className='carousel-error' class={style['carousel-error']}>{this.state.error}</span>
          <div className='button-row' class={style['button-row']}>
            <Link href='/login'>Sign in</Link>
            <button className='btn btn-primary' type='submit'>Register</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Register
