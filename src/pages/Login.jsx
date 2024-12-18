import { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from './../hooks/useLogin'
import './../styles/AuthForm.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()

    login(email, password)
  }

  return (
    <div className="container">
      <h1>ログインして思考実験をはじめよう</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="メールアドレス"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="パスワード"
          />
        </div>
        <button type="submit" className="button">
          ログイン
        </button>
        {error && <p className="error">{error}</p>}
        <Link to="/signup" className="link">
          新規登録はこちら
        </Link>
      </form>
    </div>
  )
}

export default Login
