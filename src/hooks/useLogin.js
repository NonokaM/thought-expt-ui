import { useState } from 'react'
import axios from 'axios'

function useLogin() {
  const [error, setError] = useState(null)

  const login = async (email, password) => {
    setError(null)
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/accounts/login`, {
        email: email,
        password: password,
      })

      // ログイン成功時にトークンとユーザーIDをlocalStorageに保存
      const { token, user_id } = response.data
      localStorage.setItem('token', token)
      localStorage.setItem('user_id', user_id)

      console.log('Login success:', response.data)
    } catch (err) {
      if (err.response) {
        // サーバーからのレスポンスがある場合
        setError(`Error: ${err.response.data.message}`)
      } else {
        // リクエストが送れなかった、または別のエラー
        setError('An unexpected error occurred.')
      }
    }
  }

  return { login, error }
}

export default useLogin
