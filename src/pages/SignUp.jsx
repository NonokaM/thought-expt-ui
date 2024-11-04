import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './../styles/AuthForm.css'

function SignUp() {
  const [user_name, setUser_name] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault() // デフォルトのフォーム送信を防止
    if (password !== passwordConfirm) {
      setError('パスワードが一致しません')
      return
    }

    setError('') // エラーメッセージをクリア

    // APIにデータを送信
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/accoutns/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_name,
          email,
          password,
        }),
      })

      if (!response.ok) {
        throw new Error('登録に失敗しました')
      }

      const data = await response.json()
      console.log('登録成功:', data)

      // 登録成功後にホームページにリダイレクト
      navigate('/')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="container">
      <h1>新規登録で思考実験をはじめよう</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={user_name}
            onChange={(e) => setUser_name(e.target.value)}
            required
            placeholder="ユーザー名"
          />
        </div>
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
        <div>
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
            placeholder="パスワード再入力"
          />
        </div>
        <button type="submit" className="button">登録する</button>
        {error && <p className="error">{error}</p>}
        <a href="/login" className="link">
          ログインはこちら
        </a>
      </form>
    </div>
  )
}

export default SignUp
