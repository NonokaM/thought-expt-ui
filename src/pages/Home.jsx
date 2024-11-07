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
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get('/questions')
      .then((response) => setQuestions(response.data.questions))
      .catch((error) => console.error('Error fetching questions:', error))
  }, [])

  const handleCardHover = (questionId) => {
    navigate(`/questions/${questionId}/details`)
  }

  return (
    <div className="container">
      {questions.map((question) => (
        <Card
          key={question.question_id}
          sx={{ maxWidth: 500, marginBottom: 5 }}
          onMouseEnter={() => handleCardHover(question.question_id)}
        >
          <CardActionArea>
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
