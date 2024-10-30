import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [user_name, setUser_name] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault() // デフォルトのフォーム送信を防止
    if (password !== passwordConfirm) {
      setError('パスワードが一致しません')
      return
    }
    setError('') // エラーメッセージをクリア
    console.log('ユーザー名:', user_name)
    console.log('メールアドレス:', email)
    console.log('パスワード:', password)
    navigate('/')
  }

  return (
    <div>
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
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit">登録する</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  )
}

export default SignUp
