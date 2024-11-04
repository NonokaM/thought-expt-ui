import { useState } from 'react'
import './../styles/AuthForm.css'
import useLogin from './../hooks/useLogin' // useLoginフックをインポート

function SignUp() {
  const [user_name, setUser_name] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState('')

  // useLoginフックのlogin関数とエラーを取得
  const { login, error: loginError } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault() // デフォルトのフォーム送信を防止
    if (password !== passwordConfirm) {
      setError('パスワードが一致しません')
      return
    }

    setError('') // エラーメッセージをクリア

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/accounts/signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user_name,
          email,
          password,
        }),
      })

      if (!response.ok) {
        throw new Error('登録に失敗しました')
      }

      const data = await response.json()

      // エラーチェック：errorフィールドが空でない場合はエラーを表示
      if (data.error) {
        setError(data.error)
        return
      }

      console.log('登録成功:', data)

      // 登録成功後に自動でログイン
      await login(email, password)
    } catch (error) {
      setError(error.message || '予期せぬエラーが発生しました')
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
        <button type="submit" className="button">
          登録する
        </button>
        {(error || loginError) && <p className="error">{error || loginError}</p>}
        <a href="/login" className="link">
          ログインはこちら
        </a>
      </form>
    </div>
  )
}

export default SignUp
