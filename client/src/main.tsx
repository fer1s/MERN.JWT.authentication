import axios from 'axios'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.scss'

axios.defaults.baseURL = `http://${window.location.hostname}:3001/api/`

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />,
)
