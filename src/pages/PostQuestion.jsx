import { useState } from 'react'
import './PostQuestion.css' // CSSファイルをインポート

function PostQuestion() {
  const [theme, setTheme] = useState('')
  const [quiz_text, setQuiz_text] = useState('')
  const [image_url, setImage_url] = useState('') // 画像URLの状態を追加
  const [choice1, setChoice1] = useState('')
  const [choice2, setChoice2] = useState('')
  const [answers, setAnswers] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault() // デフォルトのフォーム送信を防止
    setError('') // エラーメッセージをクリア
    console.log('問題テーマ:', theme)
    console.log('問題文:', quiz_text)
    console.log('画像URL:', image_url) // 画像URLをログに出力
    console.log('選択肢１:', choice1)
    console.log('選択肢２:', choice2)
    console.log('理由:', answers)
  }

  return (
    <div>
      <h2>問題投稿</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>問題テーマ:</label>
          <input type="text" value={theme} onChange={(e) => setTheme(e.target.value)} required />
        </div>
        <div>
          <label>画像URL:</label>
          <input type="text" value={image_url} onChange={(e) => setImage_url(e.target.value)} />
        </div>
        {image_url && (
          <div>
            <img src={image_url} alt="問題画像" style={{ maxWidth: '100%' }} />
          </div>
        )}
        <div>
          <label>問題文:</label>
          <input
            type="text"
            value={quiz_text}
            onChange={(e) => setQuiz_text(e.target.value)}
            required
          />
        </div>
        <div>
          <label>選択肢１:</label>
          <input
            type="text"
            value={choice1}
            onChange={(e) => setChoice1(e.target.value)}
            required
          />
        </div>
        <div>
          <label>選択肢２:</label>
          <input
            type="text"
            value={choice2}
            onChange={(e) => setChoice2(e.target.value)}
            required
          />
        </div>
        <div>
          <label>理由:</label>
          <input
            type="text"
            value={answers}
            onChange={(e) => setAnswers(e.target.value)}
            required
          />
        </div>
        <button type="submit">確定</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  )
}

export default PostQuestion
