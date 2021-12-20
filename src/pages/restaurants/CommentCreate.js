import { useState, useParams, useEffect } from 'react'
import axios from 'axios'
import { TextField, MenuItem, FormControl, Select, InputLabel, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'

// import { LocalizationProvider, DateTimePicker } from '@mui/lab'

// import AdapterMoment from '@mui/lab/AdapterMoment'


const CommentCreate = () => {
  let id = { useParams }

  let navigate = useNavigate()

  const [form, setForm] = useState({})


  const handleForm = e => {

    setForm(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))

  }

  const submitForm = () => {
    console.log(form)

    let token = localStorage.getItem('token')

    axios.post('http://localhost:8000/comments/create', form, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response.data)
        navigate(`/restaurants/${response.data._id}`)
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <h2>Create</h2>


      <div className="form-group">
        <TextField multiline rows="4" variant="filled" label="Comment" name="comment" onChange={handleForm} />
      </div>

      <Button onClick={submitForm} variant="contained">Submit</Button>

    </div>
  )
}

export default CommentCreate

  //Create Comment
  // const [form, setForm] = useState({})
  // useEffect(() => {
  //     setForm({
  //         restaurant_id: id,
  //     })
  // }, [restaurant])
  // const handleForm = e => {
  //     setForm(prevState => ({
  //         ...prevState,
  //         [e.target.name]: e.target.value
  //     }))