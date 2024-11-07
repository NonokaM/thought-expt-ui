import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

function Header() {
  const [value, setValue] = useState('/')
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem('token')) && Boolean(localStorage.getItem('user_id'))
  )
  const navigate = useNavigate()

  const handleChange = (event, newValue) => {
    setValue(newValue)
    navigate(newValue)
  }

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem('token')
      localStorage.removeItem('user_id')
      setIsLoggedIn(false)
      navigate('/')
    } else {
      navigate('/login')
    }
  }

  useEffect(() => {
    setValue(window.location.pathname)
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('user_id')
    setIsLoggedIn(Boolean(token) && Boolean(userId))
  }, [localStorage.getItem('token'), localStorage.getItem('user_id')])

  return (
    <header
      style={{
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        paddingLeft: '20px',
        paddingRight: '40px',
        boxSizing: 'border-box',
        backgroundColor: '#fff',
        boxShadow: '0px 2px 1px rgba(0, 0, 0, 0.1)',
        zIndex: 100,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          py: 1,
        }}
      >
        <Box sx={{ fontWeight: 'bold', fontSize: 24, ml: 2 }}>LOGO</Box>

        <Box sx={{ flexGrow: 1 }} />

        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="navigation tabs"
          textColor="inherit"
          TabIndicatorProps={{
            style: {
              backgroundColor: '#006EFF',
            },
          }}
          sx={{
            mr: 2,
            '& .MuiTab-root': { color: '#2F2F2F' },
            '& .Mui-selected': { color: '#006EFF' },
          }}
        >
          <Tab value="/" label="Home" />
          <Tab value="/questions/new" label="問題投稿" />
        </Tabs>

        <Button
          variant="contained"
          onClick={handleLoginLogout}
          sx={{
            backgroundColor: '#006EFF',
            '&:hover': { backgroundColor: '#0056CC' },
          }}
        >
          {isLoggedIn ? 'ログアウト' : 'ログイン'}
        </Button>
      </Box>
    </header>
  )
}

export default Header
