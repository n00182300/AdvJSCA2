import { useParams } from 'react-router-dom'
import axios from '../../config'
import { useEffect, useState } from 'react'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'
// import CommentList from '../../components/CommentList'
import { List, ListItemText, Typography, ListItem, TextField } from '@mui/material'

const Show = () => {
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

    //Create Comment
    const [form, setForm] = useState({})
    useEffect(() => {
        setForm({
            restaurant_id: id,
        })
    }, [restaurant])

    const handleForm = e => {
        setForm(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const submitForm = () => {
        console.log(form)
        let token = localStorage.getItem('token')
        axios.post('/comments/create', form, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data)
                setForm({ comment: "" })
                setComments(response.data.comments)
            })
            .catch(err => console.log(err))
    }
    if (!restaurant) return null
    if (!comments) return null
  
//comment compo. deals with everything that has to deal with most things with comments
const Comment = (props) => {
  return(
<ListItem>
<ListItemText
primary={props.comment.name}
                    secondary={
                        <>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {props.comment.text}
                            </Typography>
                            <br />
                            {props.comment.date}
                        </>
                    }
/>
</ListItem>
  )
}



    
    return (
      <div>
        <h2>This is the restaurants show page: {id}</h2>

        <p><b>Name: </b> {restaurant.restaurant.name} </p>
        <p><b>Cuisine: </b> {restaurant.restaurant.cuisine} </p>
        <p><b>Comments:</b></p>
        <p><b>User:</b>{restaurant.restaurant.comments[0].name}</p>
        {/* <p><b>Comments:</b>{restaurant.restaurant.comments[0].text}</p>
        <p><b>Comments:</b>{restaurant.restaurant.comments[0].date}</p> */}

        {comments.map((comment) => {
             return(
             <div key ={comment._id}>
        <p>{comment.name}</p>
        <p>{comment.text}</p>
        <p>{comment.date}</p>
        <Link to="cc" >Edit</Link>
        {/* <button style={btnStyles} onClick={submitForm}>Submit</button> */}
        </div>
      )
    })}
    {/* <CommentList /> */}
      
        
        <Link to="cc" >Edit</Link>

        <List>
                                        {comments
                                            .map((comment) => {
                                                return (
                                                    <Comment key={comment._id} comment={comment} />
                                                );
                                            })}
        </List>

        <TextField
                                                    placeholder="Add Comment"
                                        type="text"
                                        name="comment"
                                        value={form.comment}
                                        onChange={handleForm} />
                                        <Button
                                                    variant="contained"
                                                    onClick={submitForm}
                                                    >
                                                     ADD
                                                    </Button>


      </div>
      
    )


  }
  
  export default Show