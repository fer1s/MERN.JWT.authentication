import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { useState } from 'react'
import axios from 'axios'
import '../styles/Authentication.scss'

const cookies = new Cookies()

const Login = () => {
   const navigate = useNavigate()

   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   const handleAuthorization = () => {
      if(!username || !password) return;

      axios.post('auth/login', {
         username,
         password
      }).then(({data}) => {
         if(data.token) {
            cookies.set('token', data.token, { path: '/' })
            navigate('/app')
         }
      })
   }

   return (
      <div className="auth_page">
         <div className="auth_card">
            <div className="card_header">
               <h1>Log in</h1>
               <p>Log in to access our service.</p>
            </div>
            <div className="card_content">
              <div className="input">
                <p>Username</p>
                <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="input">
                <p>Password</p>
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button onClick={handleAuthorization}>Log in</button>
              <p className='acc'>Don't have an account? Register <Link to="/register">here</Link></p>
            </div>
         </div>
      </div>
   )
}

export default Login
