import { useState, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'universal-cookie'
import axios from 'axios'

import LoadingScreen from './LoadingScreen'

const cookies = new Cookies()

export default function ProtectedRoute() {
   const [user, setUser] = useState({})
   const token = cookies.get('token')

   useEffect(() => {

      axios
         .get('auth/user', {
            headers: {
               "x-auth-token": token,
            },
         })
         .then(({ data }) => {
            setUser(data)
         })
         .catch((err) => {
            console.error(err)
         })
   }, [])

   return token ? (
      user ? (
         <>
            <Outlet context={user} />
         </>
      ) : (
         <LoadingScreen />
      )
   ) : (
      <Navigate to={'/'} />
   )
}
