import { useState } from 'react'
import axios from 'axios'

function useLogin() {
  const [error, setError] = useState(null)

  const login = async (email, password) => {
    setError(null)
    try {
      const response = await axios.post('/api/login', {
        email: email,
        password: password,
      })

      console.log('Login success:', response.data)
    } catch (err) {
      if (err.response) {
        // サーバーからのレスポンスがある場合
        setError(`Error: ${err.response.data.message}`)
      } else {
        // リクエストがそもそも送れなかった、または別のエラー
        setError('An unexpected error occurred.')
      }
    }
  }

  return { login, error }
}

export default useLogin
