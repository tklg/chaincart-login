/* global fetch */
import { h, Component } from 'preact'
import { Link } from 'preact-router/match'
import { route } from 'preact-router'
import style from './style'
import { api, appUrl } from '../../util'

class Login extends Component {
  state = {
    email: '',
    password: '',
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
      const res = await fetch(api('token'), {
        method: 'POST',
        body: JSON.stringify({
          username: this.state.email,
          password: this.state.password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (res.status === 200) {
        const data = await res.json()
        window.localStorage.setItem('chaincart-data', JSON.stringify(data))
        window.location.href = appUrl
      } else {
        throw new Error((await res.json()).message)
      }
    } catch (e) {
      this.setState({
        error: e.toString().substr(6)
      })
    }
  }

  render () {
    return (
      <div class={style.login}>
        <form onSubmit={this.handleSubmit}>
          <header className='modal-header'>
            <h1>Sign in</h1>
          </header>
          <input type='email' required placeholder='Email address' value={this.state.email} onChange={e => this.handleChange('email', e.target.value)} />
          <input type='password' required placeholder='Password' onChange={e => this.handleChange('password', e.target.value)} />
          <span className='carousel-error' class={style['carousel-error']}>{this.state.error}</span>
          <div className='button-row' class={style['button-row']}>
            <Link href='/register'>Create account</Link>
            <button className='btn btn-primary' type='submit'>Sign in</button>
          </div>
          <footer>
            <Link href='/recover-password'>Forgot password</Link>
          </footer>
        </form>
      </div>
    )
  }
}

export default Login
