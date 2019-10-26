/* global fetch */
import { h, Component } from 'preact'
import { Link } from 'preact-router/match'
import style from './login/style'
import { api } from '../util'

class Recover extends Component {
  state = {
    email: '',
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
      const res = await fetch(api('recover-password'), {
        method: 'POST',
        body: JSON.stringify({
          username: this.state.email
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
            <h1>Password recovery</h1>
            <p>Enter the email address associated with your account, and we'll send you a password reset link.</p>
          </header>
          <input type='email' required placeholder='Email address' value={this.state.email} onChange={e => this.handleChange('email', e.target.value)} />
          <span className='carousel-error' class={style['carousel-error']}>{this.state.error}</span>
          <div className='button-row' class={style['button-row']}>
            <Link href='/login'>Sign in</Link>
            <button className='btn btn-primary' type='submit'>Recover</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Recover
