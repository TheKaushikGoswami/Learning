import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {

  const navigate = useNavigate()

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const loginUser = () => {
    const data = { username: username, password: password }
    axios.post('http://localhost:3001/auth/login', data).then((response) => {
      sessionStorage.setItem('accessToken', response.data)
      if(response.data.error) {
        alert(response.data.error)
      }
      else{
        sessionStorage.setItem('accessToken', response.data)
        navigate('/')
      }
    })
  }

  return (
    <div>
      
      <h1>Login</h1>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          id='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={loginUser}>Login</button>
    </div>
  )
}

export default Login
