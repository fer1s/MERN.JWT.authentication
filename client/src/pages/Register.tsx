import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import '../styles/Authentication.scss'

const Register = () => {
   const navigate = useNavigate()

   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   const handleAuthorization = () => {
      if(!username || !password) return;

      axios.post('auth/register', {
         username,
         password
      }).then(({data}) => {
         console.log(data)
         if(data.message && data.message === 'registered successfully') {
            navigate('/')
         }
      })
   }

   return (
      <div className="auth_page">
         <div className="auth_card">
            <div className="card_header">
               <h1>Register</h1>
               <p>Register to access our service.</p>
            </div>
            <div className="card_content">
               <div className="input">
                  <p>Username</p>
                  <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
               </div>
               <div className="input">
                  <p>Password</p>
                  <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
               </div>
               <button onClick={handleAuthorization}>Register</button>
               <p className='acc'>Have an account? Log in <Link to="/">here</Link></p>
            </div>
         </div>
      </div>
   )
}

export default Register
