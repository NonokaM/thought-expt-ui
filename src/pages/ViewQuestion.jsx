import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function ViewQuestion() {
  const { question_id } = useParams()
  const [question, setQuestion] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/questions/${question_id}/details`)
      .then((response) => setQuestion(response.data))
      .catch((error) => {
        console.error('Error fetching question details:', error)
        setError('質問の詳細の取得に失敗しました。')
      })
  }, [question_id])

  if (error) {
    return <div className="error">{error}</div>
  }

  if (!question) {
    return <div>読み込み中...</div>
  }

  return (
    <div>
      <h2>{question.theme}</h2>
      <img src={question.thumbnail} alt={question.theme} />
      <p>{question.question_text}</p>
      <h3>選択肢</h3>
      <ul>
        <li>{question.choice1}</li>
        <li>{question.choice2}</li>
      </ul>
      <h3>回答</h3>
      <ul>
        {question.answers.map((answer) => (
          <li key={answer.user_id}>
            <p>ユーザー名: {answer.username}</p>
            <p>選択: {answer.choice}</p>
            <p>理由: {answer.reason}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ViewQuestion
