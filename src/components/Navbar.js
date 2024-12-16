import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './Button'
import '../css/Navbar.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Navbar () {
  const [click, setClick] = useState(false)
  const [button, setButton] = useState(true)
  const [isloginned, setLoginStatus] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  //
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false)
    } else {
      setButton(true)
    }
  }
  //
  const checkLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem('user-info'))
    if (storedUser) {
      const current = Math.round(Date.now() / 1000)
      const tokenIssuedAt =
        Math.floor(Date.now() / 1000) - (3600 - storedUser.expires_in)
      const tokenExpiryTime = tokenIssuedAt + storedUser.expires_in

      if (current > tokenExpiryTime) {
        setLoginStatus(false)
        localStorage.removeItem('user-info')
        setUser(null)
      } else {
        setLoginStatus(true)
        setUser(storedUser)
      }
    } else {
      setLoginStatus(false)
      setUser(null)
    }
  }

  useEffect(() => {
    checkLogin()
  }, [])

  // const [bookList, setBookList] = useState([]);

  // const login = async () => {
  //     let loginURL = "http://127.0.0.1:8000/api/login/";
  //     const response = await axios.post(loginURL, { "username": "priyanshugupta", "password": "1234" });
  //     console.log(response);
  // }

  /* When the user clicks on the button,toggle between hiding and showing the dropdown content */
  const myFunction = () => {
    document.getElementById('myDropdown').classList.toggle('show')
  }

  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function (event) {
    if (
      !event.target.matches('.circle') ||
      event.target.parentNode.matches('.circle')
    ) {
      var dropdowns = document.getElementsByClassName('dropdown-content')
      var i
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i]
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show')
        }
      }
    }
  }

  window.addEventListener('resize', showButton)

  const handleProtectedRoute = (event, path) => {
    event.preventDefault() // Empêche la navigation par défaut
    if (!isloginned) {
      toast.error('Vous devez être connecté pour accéder à cette page !', {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: true,
        pauseOnHover: true,
        draggable: true
      })
    } else {
      navigate(path)
    }
  }

  return (
    <>
      <nav className='navbar'>
        <div class='navbar-container'>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <Link to='/' className='navbar-logo'>
            LetsProgramify
          </Link>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                {!button && <i class='fas fa-home'></i>}Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className='nav-links'
                onClick={event => handleProtectedRoute(event, '/courses')}
                style={{ cursor: 'pointer' }}
              >
                {!button && <i class='fas fa-book'></i>}Courses
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/blog' className='nav-links' onClick={closeMobileMenu}>
                {!button && <i class='fas fa-blog'></i>}Blog
              </Link>
            </li>
          </ul>
          <div class='nav-menu-right'>
            <i class='fas fa-search'></i>
            <i class='far fa-bell'></i>
            <Link to='/login' className='login-link'>
              {button && !isloginned && (
                <Button buttonStyle='btn--secondary' to='/login'>
                  Login
                </Button>
              )}
            </Link>
            <Link to='/signup' className='signup-link'>
              {button && !isloginned && <Button>Signup</Button>}
            </Link>
            <div class='dropdown'>
              {isloginned && (
                <button class='circle' onClick={myFunction}>
                  {user.user.name[0]}
                </button>
              )}
              {!isloginned && !button && (
                <button class='circle' onClick={myFunction}>
                  <i class='fas fa-user'></i>
                </button>
              )}
              <div id='myDropdown' class='dropdown-content'>
                {!isloginned && (
                  <Link to='/login' className='login-link'>
                    Login
                  </Link>
                )}
                {!isloginned && (
                  <Link to='/signup' className='login-link'>
                    Sign Up
                  </Link>
                )}
                {isloginned && (
                  <Link to='/instructor/dashboard' className='login-link'>
                    Instructor
                  </Link>
                )}
                {isloginned && (
                  <Link to='/myaccount' className='login-link'>
                    My Account
                  </Link>
                )}
                {isloginned && (
                  <Link to='/logout' className='login-link'>
                    Logout
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <ToastContainer />
    </>
  )
}

export default Navbar
