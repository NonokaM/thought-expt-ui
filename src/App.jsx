import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/common/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import PostQuestion from './pages/PostQuestion'
import AnswerQuestion from './pages/AnswerQuestion'
import UserPage from './pages/UserProfile'
import ViewQuestion from './pages/ViewQuestion'

function App() {

  return (
    <>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/questions/new" element={<PostQuestion />} />
        <Route path="/questions/:questionId" element={<ViewQuestion />} />
        <Route path="/questions/:questionId/answer" element={<AnswerQuestion />} />
        <Route path="/user/:userId" element={<UserPage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
