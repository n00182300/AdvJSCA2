import { useState } from 'react'
import axios from 'axios'
import { TextField, MenuItem, FormControl, Select, InputLabel, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'

// import { LocalizationProvider, DateTimePicker } from '@mui/lab'

// import AdapterMoment from '@mui/lab/AdapterMoment'


const Create = () => {

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

    axios.post('http://localhost:8000/restaurants/restaurants', form, {
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
        <TextField variant="filled" label="Title" name="title" onChange={handleForm} />
      </div>

      <div className="form-group">
        <TextField multiline rows="4" variant="filled" label="Description" name="description" onChange={handleForm} />
      </div>

      <div className="form-group">
        <FormControl variant="filled" fullWidth >
          <InputLabel id="city-select-label">City</InputLabel>
          <Select labelId="city-select-label" onChange={handleForm} label="City" name="city" >
            <MenuItem value="dublin">Dublin</MenuItem>
            <MenuItem value="cork">Cork</MenuItem>
            <MenuItem value="galway">Galway</MenuItem>
            <MenuItem value="mayo">Mayo</MenuItem>
            <MenuItem value="wexford">Wexford</MenuItem>
          </Select>
        </FormControl>
      </div>
      {/* <LocalizationProvider dateAdapter={AdapterMoment}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="Start Date"
            name="start_date"
            onChange={handleForm}
          />
        </LocalizationProvider> */}


      <div className="form-group">

        <TextField
          id="datetime-local"
          label="Start Date"
          type="datetime-local"
          variant="filled"
          name="start_date"
          onChange={handleForm}
          // defaultValue="2017-05-24T10:30"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="form-group">

        <TextField
          id="datetime-local"
          label="End Date"
          type="datetime-local"
          variant="filled"
          name="end_date"
          onChange={handleForm}
          // defaultValue="2017-05-24T10:30"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <Button onClick={submitForm} variant="contained">Submit</Button>

    </div>
  )
}

export default Create