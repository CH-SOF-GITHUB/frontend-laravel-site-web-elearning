import React from 'react'
import { useEffect, useState } from 'react'

function MyAccount (props) {
  var user = JSON.parse(localStorage.getItem('user-info'))

  function validateToken () {
    if (user != null) {
      // Get current timestamp
      const current = Math.round(Date.now() / 1000)

      // Calculate token expiration based on 'expires_in' value
      const tokenIssuedAt = Math.floor(Date.now() / 1000) - (3600 - user.expires_in)
      const tokenExpiryTime = tokenIssuedAt + user.expires_in

      // Check if token has expired
      if (current > tokenExpiryTime) {
        localStorage.removeItem('user-info')
        window.location.replace('/login')
      }
    } else {
      window.location.replace('/login')
    }
  }

  //
  useEffect(() => {
    validateToken()
  }, [])

  return (
    <>
      <div className='course-container'>
        <h1>My Account</h1>
        <p>Name: {user.user.name}</p>
        <p>Email: {user.user.email}</p>
      </div>
    </>
  )
}

export default MyAccount;