
import { Link } from 'react-router'

export const Unauthorized = () => {
  return (
    <div>
     <div>you are unauthorized to access these route</div>
    <Link to="/">Home</Link>
    </div>
   
  )
}
