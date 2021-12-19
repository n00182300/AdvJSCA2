
// import axios from '../config'
// import { useEffect, useState } from 'react'

// let { id } = useParams()
// const [restaurant, setRestaurant] = useState(null)
// const [comments, setComments] = useState([])


// useEffect(() => {
//     axios.get(`/restaurants/${id}`, {
//         headers: {
//             "Authorization": `Bearer ${token}`
//         }
//     })
//          .then(response => {
//             console.log(response.data)
//             setRestaurant(response.data)
//             setComments(response.data.restaurant.comments)
//             console.log(response.data.restaurant.comments)
//          })
//          .catch(err => {
//             console.log(`Error: ${err}`)
//          })
// }, [id, token])

// // if(!restaurant) return null
// // if(!comments) return null

// {comments.map((comment) => {
//     return(
//     <div key ={comment._id}>
// <p>{comment.name}</p>
// <p>{comment.text}</p>
// <p>{comment.date}</p>
// </div>
// )
// })}

// export default CommentList