import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function useLogin(onLoginSuccess) {
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const login = async (email, password) => {
    setError(null)
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/accounts/login/`, {
        email: email,
        password: password,
      })

      const { error: responseError, token, user_id } = response.data

      if (responseError === 0) {
        localStorage.setItem('token', token)
        localStorage.setItem('user_id', user_id)

        navigate('/')

        if (typeof onLoginSuccess === 'function') {
          onLoginSuccess()
        }
      } else {
        setError('Login failed. Please check your credentials.')
      }
    } catch (err) {
      if (err.response) {
        setError(`Error: ${err.response.data.message || 'An error occurred on the server.'}`)
      } else {
        setError('An unexpected error occurred.')
      }
    }
  }

  return { login, error }
}

export default useLogin
