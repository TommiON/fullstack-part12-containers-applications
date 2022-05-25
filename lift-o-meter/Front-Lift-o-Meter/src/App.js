import React, { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom"
import Workout from './components/Workout'
import ArchivedWorkouts from './components/ArchivedWorkouts'
import UserAdder from './components/UserAdder'
import LoginScreen from './components/LoginScreen'
import AccountDetails from './components/AccountDetails'
import AuthService from './services/AuthService'
import Notification from './components/Notification'
import Container from 'react-bootstrap/Container'
import NavigationBar from './components/NavigationBar'

function App() {
  
  const [loggedUser, setLoggedUser] = useState(null)
  
  const [notification, setNotification] = useState({
    message: '',
    error: false
  })

  useEffect(() => {
    const username = window.localStorage.getItem('username')
    if (username) {
      setLoggedUser(username)
    }
  }, [])

  const notify = (message, error) => {
    setNotification({ 
      message: message,
      error: error 
    })
    setTimeout(() => setNotification({
      message: '' 
    }), 3000)
  }

  const login = (userdata) => {
    window.localStorage.removeItem('username')
    window.localStorage.removeItem('accessToken')
    AuthService
            .login(userdata)
            .then(response => {
                window.localStorage.setItem('username', response.data.username)
                window.localStorage.setItem('accessToken', response.data.accessToken)
                setLoggedUser(response.data.username)
                notify(`Tervetuloa, ${window.localStorage.getItem('username')}!`)
              })
            .catch(error => {
                notify('Ongelma kirjautumisessa - väärä tunnus tai salasana?', true)
            })
  }

  const logout = () => {
    AuthService
            .logout()
            .then(response => {
                window.localStorage.removeItem('username')
                window.localStorage.removeItem('accessToken')
                setLoggedUser(null)
            })
            .catch(error => {
                
            })
  }

  return (
    <Container>
      <BrowserRouter>
        <NavigationBar logoutFunction={() => logout()} loggedIn={loggedUser} />
        <Notification message={notification.message} error={notification.error} />
        <Switch>
          <Route path="/signup">
            <UserAdder notificationCallback={notify} visible={!loggedUser} />
          </Route>
          <Route path="/next">
            {loggedUser ?
                <Workout  /> 
                        : 
                <LoginScreen loginFunction={login} visible={!loggedUser} />
            }
          </Route>
          <Route path="/completed">
            {loggedUser ?
                <ArchivedWorkouts /> 
                        : 
                <LoginScreen loginFunction={login} visible={!loggedUser} />
            }
          </Route>
          <Route path="/profile">
            {loggedUser ?
                <AccountDetails /> 
                        :
                <LoginScreen loginFunction={login} visible={!loggedUser} />
            }
          </Route>
          <Route path="/logout">
            <Redirect to="/" />
          </Route>
          <Route path="/">
            {loggedUser ?
                <Redirect to="/next" />
                        :
                <LoginScreen loginFunction={login} visible={!loggedUser} />
            }
            {loggedUser ? 
                <p></p> 
                        :
                <p>Ei käyttäjätunnusta? <Link to="/signup">Rekisteröidy</Link></p>
            }
          </Route>
        </Switch>
      </BrowserRouter>
    </Container>
  )
}

export default App;