import {useEffect, useRef, useState} from 'react'
import docImg from './assets/doc.png'
import rocketImg from './assets/rocket.png'
import lockedImg from './assets/locked.png'
import loadingGif from './assets/loading-gif.gif'
import './App.css'

function App() {
  const loginWindow = useRef()
  const [token, setToken] = useState()
  const [isLoggingIn, setIsLoggingIn] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState()
  const [userData, setUserData] = useState('UnAuthorized Please Login')

  useEffect(() => {
    window.addEventListener("message", (evt) => {
      console.log('message:incoming', evt.origin, evt.data, evt);
      if (evt.origin === 'https://localhost:4000') {
        setIsLoggedIn(true);
        setToken(JSON.parse(evt.data))
        loginWindow.current.close();
        setIsLoggingIn(true);

        // fetch('https://localhost:4000/data')
        new Promise((resolve) => {
          setTimeout(resolve, 1000)
        })
          .then((r) => {
            setUserData({ firstName: 'Foo', lastName: 'Baz' })
            setIsLoggedIn(true)
            setIsLoggingIn(false);
          })
          .catch((e) => {
            setUserData(e)
            setIsLoggedIn(false)
          })
      }
    });
  }, [])


  const handleLogin = () => {
    loginWindow.current = window.open("https://localhost:4000/auth/login");
  }

  return (
    <div className="App">
      <div>
        <img src={rocketImg} className="react rocket" alt="Rocket Icon" />
        <img src={docImg} className="react" alt="Doctor Icon" style={{ marginLeft: "-140px" }} />
      </div>


      <div className="card" style={{ display: 'grid', placeItems: 'center'}}>
        {
          isLoggingIn
            ? (
              <img src={loadingGif} alt="logging in"/>
            ) : null
        }

        {
          isLoggedIn
            ? (
              <h1>Welcome Back</h1>
            ) : null
        }

        {
          !isLoggedIn
            ? (
              <button onClick={handleLogin} style={{ display: 'flex', gap: '4px' }}>
                Login
                <img src={lockedImg} alt="locked Icon" width={18} />
              </button>
            ) : null
        }
      </div>

      <p className="read-the-docs">
        {JSON.stringify(token ?? userData, null, 2)}
      </p>
    </div>
  )
}

export default App
