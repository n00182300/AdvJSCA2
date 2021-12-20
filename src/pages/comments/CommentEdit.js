import axios from '../../config';
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { TextField, MenuItem, FormControl, Select, InputLabel, Button } from '@mui/material';
import { Grid, Container } from "@mui/material"
import { Card, FormGroup, CardHeader, CardContent } from '@mui/material';

const CommentEdit = () => {
  let navigate = useNavigate()

  let { id } = useParams()

  const [form, setForm] = useState({})

  const [comment, setComment] = useState({})

  useEffect(() => {
    setForm({
      comment_id: id,
      text: comment.text
    })
  }, [id])


  const handleForm = e => {
    setForm(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const submitForm = () => {
    console.log(form)
    let token = localStorage.getItem('token')
    axios.put(`/comments/update`, form, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response.data)
        navigate('/restaurants', { replace: true })
      })
      .catch(err => console.log(err))
  }


  //Delete
  const submitDelete = () => {
    console.log(form)
    let token = localStorage.getItem('token')
    axios.delete(`/comments/delete`, {
      data: { comment_id: id },
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(response => {
        console.log(response.data)
        navigate('/restaurants', { replace: true })
      })
      .catch(err => {
        //console.log(err.stack)
        //console.log(err.response)
      })
  }
  return (
    <div>
      <Container >
        <Grid conatiner >
          <Grid item lg={4}>
            <Card>
              <CardHeader title="Update Comment" />
              <CardContent>
                <FormGroup>

                  <TextField
                    label="Update Comment"
                    name="updated_comment"
                    value={form.updated_comment}
                    type="text"
                    variant="outlined"
                    onChange={handleForm} />
                  <Button onClick={submitForm}>Submit</Button>
                  <Button onClick={submitDelete}><Link to="/restaurants">Delete</Link></Button>

                </FormGroup>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>



    </div>
  )
}
export default CommentEdit;