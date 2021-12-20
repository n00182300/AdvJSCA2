import { useParams } from 'react-router-dom'
import axios from '../../config'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import CommentList from '../../components/CommentList'
import { List, ListItemText, Typography, ListItem, TextField } from '@mui/material'
import { Card, Button, CardHeader, CardContent } from '@mui/material';
import { Grid, Container } from "@mui/material"

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
        return (
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

                            <Link
                                to={`/comments/${props.comment._id}/edit`}
                                style={{ color: 'inherit', textDecoration: 'inherit' }}
                            >
                                <Button>
                                    Edit comment
                                </Button>
                            </Link>
                        </>
                    }
                />
            </ListItem>
        )
    }




    return (
        <div>
            <Container >
                <h2>This is the restaurants show page: {id}</h2>

                <Card>
                    <CardHeader title={restaurant.restaurant.name} />
                    <CardContent>
                        <p><b>Cruisine: </b> {restaurant.restaurant.cuisine}</p>
                        <p><b>Building: </b> {restaurant.restaurant.address.building}</p>
                        <p><b>Street: </b> {restaurant.restaurant.address.street}</p>
                        <p><b>Borough: </b> {restaurant.restaurant.borough}</p>
                        <p><b>Zipcode: </b> {restaurant.restaurant.address.zipcode}</p>
                        <p><b>Grades: </b> {restaurant.restaurant.grades[0].grade} , ({restaurant.restaurant.grades[0].date}) , ({restaurant.restaurant.grades[0].score})</p>
                    </CardContent>
                </Card>

                <List>
                    {comments.map((comment) => {
                        return (
                            <Comment restraurantId={restaurant._id} key={comment._id} comment={comment} />

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

            </Container>
        </div>

    )


}

export default Show