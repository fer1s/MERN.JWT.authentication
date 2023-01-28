import { useOutletContext } from 'react-router-dom'
import { User } from '../../types/User.type'

const Main = () => {
   const user: User = useOutletContext()

   return (
    <>
        <h1>Welcome, {user.username}</h1>
    </>
   )
}

export default Main
