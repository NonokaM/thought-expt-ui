import { useState } from 'react'

function SignUp() {
  const [user_name, setUser_name] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState('')

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
  }

  return (
    <div>
      <h1>新規登録</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ユーザー名:</label>
          <input
            type="text"
            value={user_name}
            onChange={(e) => setUser_name(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  )
}

export default SignUp
