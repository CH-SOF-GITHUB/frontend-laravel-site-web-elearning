import React, { useEffect } from 'react'

const InstructorDashboard = () => {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user-info'))

    // If user-info is available, proceed with token refresh logic
    if (user && user.access_token) {
      const refreshAuthToken = async () => {
        try {
          const token = user.access_token
          console.log('Token before refresh:', token) // Check the current token in console

          const response = await fetch(
            'http://localhost:8000/api/auth/refresh',
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          )

          // Parse the response body as JSON
          const data = await response.json()

          // Check for refresh_token in the response
          if (data.access_token) {
            localStorage.setItem('access_token', data.access_token)
            console.log('Token refreshed successfully:', data.access_token)
          } else {
            console.error('No refreshed token received.')
          }
        } catch (error) {
          console.error('Error while refreshing token:', error)
        }
      }

      // Initial token refresh
      refreshAuthToken()

      // Set up interval to refresh token every 15 minutes
      const interval = setInterval(() => {
        refreshAuthToken()
      }, 15 * 60 * 1000)

      // Cleanup interval on component unmount
      return () => clearInterval(interval)
    } else {
      console.error('User info or token not found')
    }
  }, [])

  return (
    <div>
      Instructor Dashboard
      <p>lorem</p>
    </div>
  )
}

export default InstructorDashboard
