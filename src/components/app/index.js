import { h, Component } from 'preact'
import { Router } from 'preact-router'
import style from './style.scss'
// Code-splitting is automated for routes
import Login from '../../routes/login'
import Register from '../../routes/register'
import Recover from '../../routes/recover'

export default class App extends Component {
  /** Gets fired when the route changes.
   *  @param {Object} event   "change" event from [preact-router](http://git.io/preact-router)
   *  @param {string} event.url The newly routed URL
   */
  handleRoute = e => {
    this.currentUrl = e.url
  }

  render () {
    return (
      <div id='app'>
        {<div class={style['left-block']} />}
        <div class={style['right-block']}>
          <Router onChange={this.handleRoute}>
            <Login path='/login' />
            <Register path='/register' />
            <Recover path='/recover-password' />
          </Router>
        </div>
      </div>
    )
  }
}
