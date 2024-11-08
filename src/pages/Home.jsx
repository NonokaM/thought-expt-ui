import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardActionArea from '@mui/material/CardActionArea'
import defaultImg from './../assets/default-img.png'
import './../styles/Home.css'

function Home() {
  const [questions, setQuestions] = useState([])
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/questions`)
      .then((response) => setQuestions(response.data.questions || []))
      .catch((error) => {
        console.error('Error fetching questions:', error)
        setError('質問の取得に失敗しました。')
      })
  }, [])

  const handleCardClick = (questionId) => {
    navigate(`/questions/${questionId}`)
  }

  return (
    <div className="container">
      {error && <div className="error">{error}</div>}
      {questions && questions.length === 0 && !error && <div>問題が取得できませんでした。</div>}
      {questions &&
        questions.map((question) => (
          <Card key={question.question_id} sx={{ maxWidth: 500, marginBottom: 5 }}>
            <CardActionArea onClick={() => handleCardClick(question.question_id)}>
              <CardMedia
                component="img"
                height="140"
                image={question.thumbnail || defaultImg}
                alt="img"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {question.theme}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {question.username} - {question.count} answers
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
    </div>
  )
}

export default Home
