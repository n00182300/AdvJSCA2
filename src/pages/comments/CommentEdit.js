import { useParams } from 'react-router-dom'
import axios from '../../config'
import { useEffect, useState } from 'react'
//import { Button } from '@mui/material';
import { Link } from 'react-router-dom'
// import CommentList from '../../components/CommentList'

const CommentEdit = () => {
    let { id } = useParams()
    const [restaurant, setRestaurant] = useState(null)

    const [comments, setComments] = useState([])

    let token = localStorage.getItem('token')

    useEffect(() => {
        axios.get(`/restaurants/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
             .then(response => {
                console.log(response.data)
                setRestaurant(response.data)
                setComments(response.data.restaurant.comments)
                console.log(response.data.restaurant.comments)
             })
             .catch(err => {
                console.log(`Error: ${err}`)
             })
    }, [id, token])

    if(!restaurant) return null


    
    return (
      <div>
        <h2>This is the comment edit show page: {id}</h2>

      </div>
    )


  }
  
  export default CommentEdit