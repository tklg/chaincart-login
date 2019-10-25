/* global fetch */
import { h, Component } from 'preact'
import { Link } from 'preact-router/match'
import style from './style'
import { api } from '../../util'

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
        console.log(data)
      } else {
        throw new Error(res.status)
      }
    } catch (e) {
      this.setState({
        error: e.toString()
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
          <input type='text' placeholder='Email address' value={this.state.email} onChange={e => this.handleChange('email', e.target.value)} />
          <input type='password' placeholder='Password' onChange={e => this.handleChange('password', e.target.value)} />
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
